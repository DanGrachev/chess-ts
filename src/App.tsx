import React, {FC, useEffect, useState} from 'react';
import './App.css';
import BoardComponent from "./components/BoardComponent";
import Timer from "./components/Timer";
import EatenFigures from "./components/EatenFigures";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";

const App: FC = () => {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState<Player | null>(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState<Player | null>(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => {
        restartBoard();
    }, [])

    function restartBoard() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
        setCurrentPlayer(whitePlayer);
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    }

    return (
        <div className='app-wrapper'>
            <Timer currentPlayer={currentPlayer} restart={restartBoard}/>

            <div className='app'>
                <EatenFigures title={Colors.BLACK} figures={board.eatenBlackFigures}/>

                <BoardComponent board={board} setBoard={setBoard}
                                currentPlayer={currentPlayer} swapPlayer={swapPlayer}/>

                <EatenFigures title={Colors.WHITE} figures={board.eatenWhiteFigures}/>
            </div>
        </div>
    );
};

export default App;