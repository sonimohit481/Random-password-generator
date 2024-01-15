import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isNum, setIsNum] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNum) str += "0123456789";
    if (isChar) str += "!@#$%^&*(){}?>";

    for (let i = 1; i <= length; i++) {
      const charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, isNum, isChar, setPassword]);

  const copyPassword = () => {
    passwordRef.current?.focus();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, isNum, isChar, passwordGenerator]);

  return (
    <div className="w-full h-screen  bg-black dark:bg-slate-100 flex justify-center items-center">
      <div
        className={
          "w-full max-w-md mx-auto rounded-lg shadow-xl p-4 m-8 text-balck bg-white dark:text-white dark:bg-black"
        }
      >
        <h1 className="text-3xl font-bold text-center mb-4">
          Password Generator
        </h1>
        <div className="flex shadow-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 bg-slate-200 dark:bg-white dark:text-black"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className={"bg-blue-500 text-white px-4 py-2 hover:bg-orange-700"}
            onClick={copyPassword}
          >
            COPY
          </button>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            <input
              type="range"
              min={6}
              max={18}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full mr-2"
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={isNum}
              id="numberInput"
              onChange={() => setIsNum((prev) => !prev)}
            />
            <label className="ml-2">Number</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={isChar}
              id="charInput"
              onChange={() => setIsChar((prev) => !prev)}
            />
            <label className="ml-2">Char</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
