import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isNum, setIsNum] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);

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
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 900);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, isNum, isChar, passwordGenerator]);

  return (
    <div className="rg-page">
      <div className="rg-card" role="application" aria-label="Password generator">
        <div className="rg-crown" aria-hidden="true">
          <svg viewBox="0 0 128 64" width="72" height="36">
            <path
              d="M12 48 L28 18 L48 40 L64 12 L80 40 L100 18 L116 48 Z"
              fill="#f6d04f"
              stroke="#b48b1d"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <rect
              x="14"
              y="44"
              width="100"
              height="14"
              rx="4"
              fill="#f6d04f"
              stroke="#b48b1d"
              strokeWidth="6"
            />
            <circle cx="28" cy="18" r="6" fill="#7bdcff" />
            <circle cx="64" cy="12" r="6" fill="#7bdcff" />
            <circle cx="100" cy="18" r="6" fill="#7bdcff" />
          </svg>
        </div>

        <h1 className="rg-title">Generate a Password</h1>

        <div className="rg-row rg-passwordRow">
          <input
            type="text"
            value={password}
            className="rg-input"
            aria-label="Generated password"
            readOnly
            ref={passwordRef}
          />
          <button className="rg-copyBtn" onClick={copyPassword} type="button">
            {copied ? "COPIED" : "COPY"}
          </button>
        </div>

        <div className="rg-row rg-controls">
          <div className="rg-sliderGroup">
            <input
              className="rg-slider"
              type="range"
              min={6}
              max={18}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              aria-label="Password length"
            />
            <div className="rg-label">
              <span className="rg-labelKey">Length</span>
              <span className="rg-labelVal">{length}</span>
            </div>
          </div>

          <div className="rg-toggleGroup" aria-label="Options">
            <div className="rg-togglePill">
              <span className="rg-miniCrown" aria-hidden="true">
                <svg viewBox="0 0 64 32" width="16" height="16">
                  <path
                    d="M6 26 L14 10 L24 22 L32 8 L40 22 L50 10 L58 26 Z"
                    fill="#f6d04f"
                    stroke="#b48b1d"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="rg-pillText">Numbers</span>
              <label className="rg-switch">
                <input
                  type="checkbox"
                  checked={isNum}
                  onChange={() => setIsNum((prev) => !prev)}
                />
                <span className="rg-switchTrack" aria-hidden="true" />
              </label>
            </div>

            <div className="rg-togglePill">
              <span className="rg-pillText">Symbols</span>
              <label className="rg-switch">
                <input
                  type="checkbox"
                  checked={isChar}
                  onChange={() => setIsChar((prev) => !prev)}
                />
                <span className="rg-switchTrack" aria-hidden="true" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
