import React, {FC, useEffect, useState} from 'react';
import '../App.css';
import CellComponent from "./CellComponent";
import {Board} from "../models/Board";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface BoardComponentProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponent: FC<BoardComponentProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setCell] = useState<Cell | null>(null);

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function selectCell(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer()
            setCell(null);
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setCell(cell);
            }
        }
    }

    const highlightCells = () => {
        board.highlightCells(selectedCell);
        updateBoard();
    }

    const updateBoard = () => {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
            <div>
                <h2 className='title'>Current player: {currentPlayer?.color}</h2>
                <div className='board'>
                    {board.cells.map((row, index) =>
                        <React.Fragment key={index}>
                            {row.map(cell => <CellComponent key={cell.id}
                                                            cell={cell}
                                                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                                            selectCell={selectCell}
                            />)}
                        </React.Fragment>
                    )}
                </div>
            </div>
    );
};

export default BoardComponent;