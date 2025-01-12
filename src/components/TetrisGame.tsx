import { useEffect, useState, useCallback } from 'react';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const EMPTY_CELL = 0;

export const TetrisGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState(Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill(EMPTY_CELL)));
  const [score, setScore] = useState(0);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setBoard(Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill(EMPTY_CELL)));
  };

  return (
    <div className="p-4 text-center">
      {!gameStarted ? (
        <button
          onClick={startGame}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Start Tetris
        </button>
      ) : (
        <div className="space-y-4">
          <div className="text-lg font-bold">Score: {score}</div>
          <div className="inline-block border-2 border-primary p-2">
            {board.map((row, i) => (
              <div key={i} className="flex">
                {row.map((cell, j) => (
                  <div
                    key={`${i}-${j}`}
                    className={`w-6 h-6 border border-gray-700 ${
                      cell ? 'bg-primary' : 'bg-background'
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};