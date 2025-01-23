import { useState } from 'react';
import xImage from './assets/x.png';
import oImage from './assets/o.png';
import './App.css';

type CellValue = 'X' | 'O' | null;
type Winner = 'X' | 'O' | 'draw' | null;

function App(): JSX.Element {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<Winner>(null);

  const winningCombinations: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6], 
  ];

  function checkForWinner(newBoard: CellValue[]): Winner {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }

    if (newBoard.every((cell) => cell !== null)) {
      return 'draw';
    }

    return null;
  }

  function handleCellClick(index: number): void {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';

    const newWinner = checkForWinner(newBoard);

    setBoard(newBoard);
    setIsXTurn((prev) => !prev);
    setWinner(newWinner);
  }

  function handlePlayAgain(): void {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  }

  return (
    <div className="container">
      <h1>X Mix Drix</h1>
      
      {/* Game Board */}
      <div className="board">
        {board.map((value, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleCellClick(index)}
          >
            {value === 'X' && <img src={xImage} alt="X" />}
            {value === 'O' && <img src={oImage} alt="O" />}
          </div>
        ))}
      </div>

      {/* Show result message if there is a winner (or draw) */}
      {winner && (
        <div className="message">
          {winner === 'draw' ? (
            <h2>It's a draw!</h2>
          ) : (
            <h2>Player {winner} wins!</h2>
          )}
          <button onClick={handlePlayAgain}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;