import { useState, useEffect } from "react";
import { Check, Menu, X } from "lucide-react"; 
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);
  const [targetColor, setTargetColor] = useState("");
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [round, setRound] = useState(0);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleColorPick = (color) => {
    setSelectedColor(color);
    const correct = color === targetColor;

    setIsCorrect(correct);
    setMessage(correct ? "Perfect match!" : "Oops, color mismatch");

    if (correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(generateNewRound, 500);
  };  

  const generateNewRound = (resetScore = false) => {
    if (round === 5) {
      setIsScoreModalOpen(true);
      return;
    }
  
    setLoading(true);
    setMessage("");
    setIsRestartModalOpen(false);
  
    setTimeout(() => {
      const newTargetColor = getRandomColor();
      let randomColors = new Set();
  
      while (randomColors.size < 5) {
        let newColor = getRandomColor();
        if (newColor !== newTargetColor) {
          randomColors.add(newColor);
        }
      }
  
      const newOptions = shuffleArray([newTargetColor, ...randomColors]);
  
      setTargetColor(newTargetColor);
      setOptions(newOptions);
      setSelectedColor(null);
      setLoading(false);
      setRound((prev) => (resetScore ? 1 : prev + 1));
  
      if (resetScore) {
        setScore(0);
      }
    }, 500);
  };  

  // useEffect(() => {
  //   generateNewRound();
  // }, []);

  useEffect(() => {
    if (round === 0 && score === 0 && !isScoreModalOpen) {
      generateNewRound(true);
    }
  }, [round, score, isScoreModalOpen]);


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
          <h3 data-testid="score">Score: <strong>{score}</strong> </h3>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`header-btns ${menuOpen ? "open" : ""}`}>
          <button 
            onClick={() => {
              setIsHelpModalOpen(true);
              setMenuOpen(false);
            }}>
              Help
            </button>
          <button 
            onClick={() => {
              setIsRestartModalOpen(true)
              setMenuOpen(false);
            }}
            data-testid="nextGameButton"
          >
            Restart
          </button>
        </div>
      </header>

      {/* score for small screens */}
      <div className="sm-score">
        <h3 data-testid="score">Score: <strong>{score}</strong> </h3>
      </div>

      <section className="game-container">
        <section className="game-board">
          {loading ? (
            <div className="loader">
              <div className="loader-spin"></div>
            </div>
          ) : (
            <>
              <div className="target-color" style={{ backgroundColor: targetColor }} data-testid="colorBox"></div>
              <h3 data-testid="gameInstructions">Color Match: Choose the color that matches the one above.</h3>
              <div className="options">
                {options.map((color, index) => (
                  <div 
                    key={index} 
                    className={`option-color ${selectedColor === color ? (isCorrect ? "selected correct" : "selected wrong") : ""}`} 
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorPick(color)}
                    data-testid="colorOption"
                  >
                    {selectedColor === color && (
                      isCorrect ? <Check size={24} className="check-icon" /> : <X size={24} className="cross-icon" />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          {message && <div className="message" data-testid="gameStatus">{message}</div>}
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

      {isRestartModalOpen && (
        <div className="modal-overlay" onClick={() => setIsRestartModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Restart</h2>
            <p>You&apos;ll loose your score if you restart, Do you want to restart?</p>
            <div className="modal-btn">
              <button className="restart-btn" onClick={() => generateNewRound(true)}>Restart</button>
              <button className="close-btn" onClick={() => setIsRestartModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isScoreModalOpen && (
        <div className="modal-overlay" 
          onClick={() => {
            setIsScoreModalOpen(false)
            setRound(0);
            setScore(0);
          }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Game Over!</h2>
            
            <img 
              src={score >= 4 
                ? "https://cdn.pixabay.com/animation/2024/11/04/15/55/15-55-26-388_256.gif"
                : "https://cdn.pixabay.com/animation/2024/01/14/13/01/13-01-57-167_512.gif"
              }  
              alt={score >= 4 ? "Celebration" : "Sad"}
              loading="lazy"
              className="result-gif"
            />

            <p className="score-remark">
              {score === 5 ? "Spot on color magician!, You got a perfect score!" :
              score > 3 ? `Great job color genuis!, You scored ${score}/5!` :
              score === 3 ? `Very close to perfection!, You scored ${score}/5!, You can do much better!` :
              score > 0 ? `You scored ${score}/5. So close, yet so far, Keep practicing!` :
              "Oops! You didn't get any right. How often do you take garri? Try again!"}
            </p>
            <div className="modal-btn">
              <button className="restart-btn" onClick={() => {
                setIsScoreModalOpen(false);
                setRound(0);
                setScore(0);
              }}>
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
// 
export default App
