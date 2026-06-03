import { useState, useEffect } from 'react';
import '../styles/Timer.css';

import resetIcon from "../assets/reset.svg";
import pauseIcon from "../assets/pause.svg";
import resumeIcon from "../assets/resume.svg";

export function Timer({ isRunning, resetKey }) {
    const [seconds, setSeconds] = useState(0);
    const [isManuallyPaused, setIsManuallyPaused] = useState(false);

    // reset timer and pause state when resetKey changes (new board generated)
    useEffect(() => {
        setSeconds(0);
        setIsManuallyPaused(false);
    }, [resetKey]);

    const isTimerActive = isRunning && !isManuallyPaused;

    // track elapsed time when active
    useEffect(() => {
        if (!isTimerActive) {
            return;
        }

        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isTimerActive]);

    // format seconds into DD:hh:mm:ss
    function formatTime(totalSeconds) {
        const secs = totalSeconds % 60;
        const totalMinutes = Math.floor(totalSeconds / 60);
        const mins = totalMinutes % 60;
        const totalHours = Math.floor(totalMinutes / 60);
        const hours = totalHours % 24;
        const days = Math.floor(totalHours / 24);

        const pad = (num) => String(num).padStart(2, '0');

        return `${pad(days)}:${pad(hours)}:${pad(mins)}:${pad(secs)}`;
    }

    function handleReset() {
        setSeconds(0);
    }

    function handleTogglePause() {
        setIsManuallyPaused(prev => !prev);
    }

    return (
        <div className="sudoku-timer" id="timer">
            <button
                className="timer-btn reset-btn"
                onClick={handleReset}
                title="Reset timer"
                aria-label="Reset timer"
            >
                <img src={resetIcon} alt="Reset" />
            </button>
            <span className="timer-text">{formatTime(seconds)}</span>
            <button
                className="timer-btn pause-resume-btn"
                onClick={handleTogglePause}
                title={isTimerActive ? "Pause timer" : "Resume timer"}
                aria-label={isTimerActive ? "Pause timer" : "Resume timer"}
                disabled={!isRunning}
            >
                <img
                    src={isTimerActive ? pauseIcon : resumeIcon}
                    alt={isTimerActive ? "Pause" : "Resume"}
                />
            </button>
        </div>
    );
}
