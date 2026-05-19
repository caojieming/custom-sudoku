import { useState } from 'react';
import '../styles/Settings.css';

export function Settings() {
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
                            {/* Empty for now, as requested */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
