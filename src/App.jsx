import { useState } from 'react';
import './styles/App.css';
import { ThemeToggle } from './components/ThemeToggle.jsx';
import { SudokuBoard } from './components/SudokuBoard.jsx';
import { Settings } from './components/Settings.jsx';
import { GenerateBoard } from './components/GenerateBoard.jsx';

function App() {
	const initBoard = Array.from(
		{ length: 81 },
		() => ({ value: '', isInitial: false })
	);
	// 1d array (81 cells) of current board
	const [board, setBoard] = useState(initBoard);
	const [difficulty, setDifficulty] = useState('medium');
	// 1d array (81 cells) of solution values
	const [fullSolution, setFullSolution] = useState(null);
	// indices in fullSolution
	const [clueIndices, setClueIndices] = useState([]);

	// both helper and "setter" of difficulty values
	function getClueCount(diff) {
		if (diff === 'easy') {
			return 40;
		}
		if (diff === 'medium') {
			return 30;
		}
		if (diff === 'hard') {
			return 20;
		}
	}

	// generating a new board
	function handleGenerate(puzzle) {
		const { fullSolution: sol, clueIndices: indices } = puzzle;
		setFullSolution(sol);
		setClueIndices(indices);

		const clueCount = getClueCount(difficulty);
		const initialIndices = new Set(indices.slice(0, clueCount));

		const newBoard = Array.from({ length: 81 }, (_, i) => {
			const isInitial = initialIndices.has(i);
			return {
				value: isInitial ? sol[i] : '',
				isInitial
			};
		});
		setBoard(newBoard);
	}

	// difficulty setting changes, both pre- and mid-game
	function handleDifficultyChange(newDiff) {
		setDifficulty(newDiff);
		if (fullSolution === null) {
			return;
		}

		const clueCount = getClueCount(newDiff);
		const newClues = new Set(clueIndices.slice(0, clueCount));

		setBoard((prevBoard) => {
			return prevBoard.map((cell, i) => {
				const shouldBeClue = newClues.has(i);
				if (shouldBeClue) {
					// overwrite with clue when lowering difficulty, or keep existing clue
					return {
						value: fullSolution[i],
						isInitial: true
					};
				}
				else {
					// if it was a clue before but is no longer a clue, clear it
					if (cell.isInitial) {
						return {
							value: '',
							isInitial: false
						};
					}
					else {
						// don't change input in non-clue cells
						return cell;
					}
				}
			});
		});
	}

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

	// fill all inputs with solution values
	function handleShowSolution() {
		if (fullSolution === null) return;
		setBoard((prevBoard) => {
			return prevBoard.map((cell, i) => {
				if (cell.isInitial) return cell;
				return {
					...cell,
					value: fullSolution[i]
				};
			});
		});
	}

	return (
		<>
			<header id='header'>
				<ThemeToggle />
				<Settings
					difficulty={difficulty}
					onChangeDifficulty={handleDifficultyChange}
					onShowSolution={handleShowSolution}
					isGameActive={fullSolution !== null}
				/>
			</header>
			<h1 id='title'>Sudoku</h1>

			<main id='mainContent'>
				<GenerateBoard onGenerate={handleGenerate} />
				<section>
					<SudokuBoard board={board} onCellChange={handleCellChange} />
				</section>
			</main>
		</>
	);
}
export default App;
