import { useState } from 'react';
import '../styles/Settings.css';

export function Settings({ difficulty, onChangeDifficulty }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                Settings
            </button>

            {isOpen && (
                <div className="settings-overlay" onClick={() => setIsOpen(false)}>

                    <div className="settings-modal" onClick={(e) => e.stopPropagation()}>

                        <div className="settings-header">
                            <h2>Settings</h2>
                            <button onClick={() => setIsOpen(false)}>X</button>
                        </div>

                        <div className="settings-content">

                            <div className="settings-row">
                                <span className="settings-label">Difficulty</span>

                                <div className="difficulty-options">
                                    <button
                                        className={`difficulty-btn ${difficulty === 'easy' ? 'active' : ''}`}
                                        onClick={() => onChangeDifficulty('easy')}
                                    >
                                        Easy
                                    </button>
                                    <button
                                        className={`difficulty-btn ${difficulty === 'medium' ? 'active' : ''}`}
                                        onClick={() => onChangeDifficulty('medium')}
                                    >
                                        Medium
                                    </button>
                                    <button
                                        className={`difficulty-btn ${difficulty === 'hard' ? 'active' : ''}`}
                                        onClick={() => onChangeDifficulty('hard')}
                                    >
                                        Hard
                                    </button>
                                </div>

                            </div> {/* settings-row */}
                        </div> {/* settings-content */}
                    </div> {/* settings-modal */}
                </div> // setings-overlay
            )}
        </>
    );
}
