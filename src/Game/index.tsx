import "./index.css";
import React, { useState, useEffect, useCallback } from "react";
import Square from "./components/Square"

export default function Game() {
    const initialSquares = Array(9).fill(null);
    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [squares, setSquares] = useState<string[]>(initialSquares);
    const [status, setStatus] = useState<string>();

    const calculateWinner = useCallback((squares: Array<string>) => {
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
        setStatus(statusUpdate);
    }, [squares, calculateWinner, xIsNext]);

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
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    };

    const handleRestart = () => {
        setSquares(initialSquares);
        setXIsNext(true);
    };

    return (
        <div>
            <div className="status">{status}</div>
            <div className="game">
                <div className="board">
                    {squares.map((_, i) => (
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
        </div>
    );
}