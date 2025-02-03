import { useState } from "react";
import { Menu, X } from "lucide-react"; 
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

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
          <h3>Score: <strong>0</strong> </h3>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`header-btns ${menuOpen ? "open" : ""}`}>
          <button onClick={() => setIsHelpModalOpen(true)}>Help</button>
          <button>Restart</button>
        </div>
      </header>

      {/* score for small screens */}
      <div className="sm-score">
        <h3>Score: <strong>0</strong> </h3>
      </div>

      <section className="game-container">
        <section className="game-board">
          <div>
            <div className="target-color"></div>
          </div>

          <div className="options">
            <div className="option-color one"></div>
            <div className="option-color two"></div>
            <div className="option-color three"></div>
            <div className="option-color four"></div>
            <div className="option-color five"></div>
            <div className="option-color six"></div>
          </div>
        </section>
      </section>

      <footer>
        <p>&copy; 2025 Revo. All rights reserved.</p>
      </footer>

      {/* Help Modal */}
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
