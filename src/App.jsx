import './styles/App.css';
import { ThemeToggle } from './components/ThemeToggle.jsx';
import { SudokuBoard } from './components/SudokuBoard.jsx';
import { Settings } from './components/Settings.jsx';

function App() {

	return (
		<>
			<header style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', gap: '10px' }}>
				<ThemeToggle />
				<Settings />
			</header>
			<h1 id='title'>Sudoku</h1>

			<main id='mainContent'>
				<section>
					<SudokuBoard />
				</section>
			</main>
		</>
	)
}
export default App
