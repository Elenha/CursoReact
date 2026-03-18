import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// Constantes para los turnos
const TURNS = {
  X: 'X',
  O: 'O'
}



// Cuadrado del tablero
const Square = ({children, updateBoard, index}) => {
    return (
      <div className='square'>
        {children}
      </div>
    )
}
function App() {
  // Tablero (hay que pasarlo a estado)
  const [board, setBoard] = useState(Array(9).fill(null))


  return (
    <main className='board'>
        <h1>Tic Tac Toe</h1>
        <section className='game'>
          {
            board.map((_, index) => {
                return (
                <Square 
                  key={index}
                  indice={index}>
                    
                </Square>
                )
              }
            )
          }
        </section>
    </main>
  )
}

export default App
