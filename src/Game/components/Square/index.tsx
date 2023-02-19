import React, { memo, MouseEvent } from "react";

interface SquareProps {
    value: string;
    onSquareClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

function Square({ value, onSquareClick }: SquareProps) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default memo(Square);