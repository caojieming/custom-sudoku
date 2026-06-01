import { useState, useEffect } from 'react';
import '../styles/Timer.css';

export function Timer({ isRunning, resetKey }) {
    const [seconds, setSeconds] = useState(0);

    // reset timer when resetKey changes (new board generated)
    useEffect(() => {
        setSeconds(0);
    }, [resetKey]);

    // track elapsed time when active
    useEffect(() => {
        if (!isRunning) {
            return;
        }

        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning]);

    // format seconds into DD:hh:mm:ss
    const formatTime = (totalSeconds) => {
        const secs = totalSeconds % 60;
        const totalMinutes = Math.floor(totalSeconds / 60);
        const mins = totalMinutes % 60;
        const totalHours = Math.floor(totalMinutes / 60);
        const hours = totalHours % 24;
        const days = Math.floor(totalHours / 24);

        const pad = (num) => String(num).padStart(2, '0');

        return `${pad(days)}:${pad(hours)}:${pad(mins)}:${pad(secs)}`;
    };

    return (
        <div className="sudoku-timer" id="timer">
            {formatTime(seconds)}
        </div>
    );
}
