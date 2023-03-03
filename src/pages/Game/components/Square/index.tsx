import React, { MouseEvent } from "react";

interface SquareProps {
    value: string;
    onSquareClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

function Square(props: SquareProps) {
  const { value, onSquareClick } = props;
    return ( 
      <button className="square" onClick={onSquareClick}>
      {value}
      </button>
    );
  }
  
export default Square;