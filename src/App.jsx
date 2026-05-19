import './styles/App.css';
import { ThemeToggle } from './components/ThemeToggle.jsx';
import { SudokuGrid } from './components/SudokuGrid.jsx';
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
					<SudokuGrid />
				</section>
			</main>
		</>
	)
}
export default App
