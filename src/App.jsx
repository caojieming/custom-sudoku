import './styles/App.css';
import { ThemeToggle } from './components/ThemeToggle.jsx';
import { SudokuGrid } from './components/SudokuGrid.jsx';

function App() {

	return (
		<>
			<ThemeToggle />
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
