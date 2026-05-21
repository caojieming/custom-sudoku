import { useState } from 'react';
import './styles/App.css';
import { ThemeToggle } from './components/ThemeToggle.jsx';
import { SudokuBoard } from './components/SudokuBoard.jsx';
import { Settings } from './components/Settings.jsx';
import { GenerateBoard } from './components/GenerateBoard.jsx';

function App() {
	// board contents stored at top level so it can be shared with lower levels (SudokuBoard, GenerateBoard)
	const initBoard = Array.from(
		{ length: 81 },
		() => ({ value: '', isInitial: false })
	);
	const [board, setBoard] = useState(initBoard);

	// changing cell value/input changes board values
	function handleCellChange(idx, value) {
		// only allow empty string or numbers 1-9
		if (value !== '' && !/^[1-9]$/.test(value)) return;

		setBoard((prevBoard) => {
			const newBoard = [...prevBoard];
			if (!newBoard[idx].isInitial) {
				newBoard[idx] = { ...newBoard[idx], value };
			}
			return newBoard;
		});
	}

	return (
		<>
			<header id='header'>
				<ThemeToggle />
				<Settings />
			</header>
			<h1 id='title'>Sudoku</h1>

			<main id='mainContent'>
				<GenerateBoard onGenerate={setBoard} />
				<section>
					<SudokuBoard board={board} onCellChange={handleCellChange} />
				</section>
			</main>
		</>
	);
}
export default App;
