// import { useState } from 'react';
import './styles/App.css';
import { PersonState } from './components/PersonState.jsx';

function App() {
	// const [count, setCount] = useState(0);

	return (
		<>
			<h1 id='title'>Sample title</h1>

			<main id='mainContent'>
				<section>
					<PersonState />
				</section>
			</main>
		</>
	)
}
export default App
