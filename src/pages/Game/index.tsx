import "./index.css";
import React, { useEffect, useCallback } from "react";
import Square from "./components/Square";
import { setXIsNext, setSquares, setStatus, getName } from '../../toolkit/gameSlice'
import { useAppSelector, useAppDispatch } from '../../toolkit/hooks'


export default function Game() {
  // const { xIsNext, setXIsNext, squares, setSquares, status, setStatus, name, getName } = props;
  const xIsNext = useAppSelector((state) => state.xIsNext);
  const squares = useAppSelector((state) => state.squares);
  const status = useAppSelector((state) => state.status);
  const name = useAppSelector((state) => state.name);
  const dispatch = useAppDispatch();

  const calculateWinner = useCallback((squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }, []);

  const winner = calculateWinner(squares);

  useEffect(() => {
    const winner = calculateWinner(squares);
    const statusUpdate = winner
      ? `The winner is ${winner}`
      : `Next player: ${xIsNext ? "X" : "O"}`;
    dispatch(setStatus(statusUpdate));
  }, [squares, calculateWinner, xIsNext, dispatch ]);

  const createHandleClick = (i: number) => () => {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    dispatch(setSquares(nextSquares));
    dispatch(setXIsNext());
  };

  const handleRestart = () => {
    dispatch(setSquares(Array(9).fill(null)));
    dispatch(setXIsNext());
    dispatch(getName());
  };

  
  return (
    <div>
      <div className="status">{status}</div>
      <div className="game">
        <div className="board">
          {squares.map((_: any, i: number) => (
            <Square
              value={squares[i]}
              onSquareClick={createHandleClick(i)}
              key={i}
            />
          ))}
        </div>
      </div>
      <button className="restart-button" onClick={handleRestart}>
        Restart 
      </button>
      <div className="status">Player {name}</div>
    </div>
  );
}
