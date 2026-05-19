import { useState, useEffect } from 'react';

export function ThemeToggle() {
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	function toggleTheme() {
		// change theme from light/dark to dark/light
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	}

	return (
		<button onClick={toggleTheme} style={{ padding: '8px 16px', cursor: 'pointer' }}>
			Toggle Theme
		</button>
	);
}
