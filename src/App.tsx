import { useCallback, useEffect, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isNum, setIsNum] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNum) str += "0123456789";
    if (isChar) str += "!@#$%^&*(){}?>";

    for (let i = 1; i <= length; i++) {
      const charIndex = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, isNum, isChar, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, isNum, isChar, passwordGenerator]);

  return (
    <div className="w-ful max-w-md mx-auto rounded-lg shadow-xl px-4 m-8 text-orange-500 bg-slate-800">
      <h1 className=" text-center">Password Generator</h1>
      <div className="flex shadow-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
        />
        <button>COPY</button>
      </div>
      <div>
        <div>
          <input
            type="range"
            min={6}
            max={18}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>length: {length}</label>
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked={isNum}
            id="numberInput"
            onChange={() => setIsNum((pre) => !pre)}
          />
          <label>Number</label>
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked={isChar}
            id="numberInput"
            onChange={() => setIsChar((pre) => !pre)}
          />
          <label>Char</label>
        </div>
      </div>
    </div>
  );
}

export default App;
