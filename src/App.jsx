// import { useState } from 'react'
import './App.css'

function App() {

  return (
    <section className="container">
      <header>
        <h1>Color<span>Match</span></h1>

        <div className="bg-score">
          <h3>Score: <strong>0</strong> </h3>
        </div>

        <div className='header-btns'>
          <div>
            <button>Help</button>
          </div>
          
          <div>
            <button>Restart</button>
          </div>
        </div>
      </header>
      
      {/* score for small screens */}
      <div className="sm-score">
        <h3>Score: <strong>0</strong> </h3>
      </div>

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

      <footer>
        <p>&copy; 2025 Revo. All rights reserved.</p>
      </footer>
    </section>
  )
}

export default App
