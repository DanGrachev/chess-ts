import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [timeCounter, setCounter] = useState(300);
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        startTimer();
    }, [currentPlayer]);

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current);
        }
        setCounter(300);

        timer.current = setInterval(() => {
            setCounter(prev => {
                if (prev === 0) {
                    gameOver();
                }
                return prev - 1;
            });
        }, 1000);
    }

    function handleRestart() {
        setCounter(300);
        restart();
    }

    function gameOver() {
        const winner = currentPlayer?.color === Colors.BLACK ? 'White' : 'Black'
        alert(`${winner} player win`);
        handleRestart();
    }

    return (
        <div className='timer'>
            <div>{timeCounter}</div>
            <button onClick={() => handleRestart()}>Restart game</button>
        </div>
    );
};

export default Timer;