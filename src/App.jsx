import { useState, useEffect } from "react";
import { Check, Menu, X, XCircle, Loader } from "lucide-react"; 
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [targetColor, setTargetColor] = useState("");
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const generateColorShades = (baseColor) => {
    let shades = [];

    const rgbValues = baseColor.match(/\d+/g); // Extract RGB values
    if (!rgbValues) return [];

    const [r, g, b] = rgbValues.map(Number);

    for (let i = 0; i < 5; i++) {
      const newR = Math.min(255, Math.max(0, r + Math.floor(Math.random() * 50 - 25)));
      const newG = Math.min(255, Math.max(0, g + Math.floor(Math.random() * 50 - 25)));
      const newB = Math.min(255, Math.max(0, b + Math.floor(Math.random() * 50 - 25)));
      shades.push(`rgb(${newR}, ${newG}, ${newB})`);
    }

    return shades;
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleColorPick = (color) => {
    setSelectedColor(color);
    const correct = color === targetColor;

    setIsCorrect(correct);
    setMessage(correct ? "✅ Correct! 🎉" : "❌ Wrong! Try again.");

    if (correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(generateNewRound, 1500);
  };

  const generateNewRound = (resetScore = false) => {
    setLoading(true);
    setMessage("");

    setTimeout(() => {
      const newTargetColor = getRandomColor();
      const colorShades = generateColorShades(newTargetColor);
      const newOptions = shuffleArray([...colorShades, newTargetColor]);

      setTargetColor(newTargetColor);
      setOptions(newOptions);
      setSelectedColor(null);
      setLoading(false);

      if (resetScore) {
        setScore(0);
      }
    }, 1000);
  };


  useEffect(() => {
    generateNewRound();
  }, []);

  return (
    <section className="container">
      <header>
        <h1 className="colorful-title">
          <span style={{ color: "#FF5733" }}>C</span>
          <span style={{ color: "#FFC300" }}>o</span>
          <span style={{ color: "#FF33F6" }}>l</span>
          <span style={{ color: "#33FF57" }}>o</span>
          <span style={{ color: "#3380FF" }}>r</span>
          <span> </span>
          <span style={{ color: "#FF5733" }}>M</span>
          <span style={{ color: "#FFC300" }}>a</span>
          <span style={{ color: "#FF33F6" }}>t</span>
          <span style={{ color: "#33FF57" }}>c</span>
          <span style={{ color: "#3380FF" }}>h</span>
        </h1>

        <div className="bg-score">
          <h3>Score: <strong>{score}</strong> </h3>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`header-btns ${menuOpen ? "open" : ""}`}>
          <button onClick={() => setIsHelpModalOpen(true)}>Help</button>
          <button onClick={() => generateNewRound(true)}>Restart</button>
        </div>
      </header>

      {/* score for small screens */}
      <div className="sm-score">
        <h3>Score: <strong>{score}</strong> </h3>
      </div>

      <section className="game-container">
        <section className="game-board">
          {loading ? (
            <div className="loader">
              <Loader size={50} className="spinner" />
            </div>
          ) : (
            <>
              <div className="target-color" style={{ backgroundColor: targetColor }}></div>

              <div className="options">
                {options.map((color, index) => (
                  <div 
                    key={index} 
                    className={`option-color ${selectedColor === color ? (isCorrect ? "selected correct" : "selected wrong") : ""}`} 
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorPick(color)}
                  >
                    {selectedColor === color && (
                      isCorrect ? <Check size={24} className="check-icon" /> : <XCircle size={24} className="cross-icon" />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          {message && <div className="message">{message}</div>}
        </section>
      </section>

      {/* <footer>
        <p>&copy; 2025 Revo. All rights reserved.</p>
      </footer> */}

      {isHelpModalOpen && (
        <div className="modal-overlay" onClick={() => setIsHelpModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>How to Play</h2>
            <ul>
              <li>
                <p>Guess the correct target color from the given options!</p>
              </li>
              <li>
                <p>Every correct guess earn you a point.</p>
              </li>
              <li>
                <p>You can also restart the game by clicking the &quot;Restart&quot; button</p>
              </li>
            </ul>
            <div className="modal-btn">
              <button className="close-btn" onClick={() => setIsHelpModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default App
