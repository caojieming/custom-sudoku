import '../styles/SudokuGrid.css';

export function SudokuGrid() {
	// 9x9 grid
	const cells = Array.from({ length: 81 });

	return (
		<div className="sudoku-container">
			<div className="sudoku-grid">
				{cells.map((_, index) => {
					const row = Math.floor(index / 9);
					const col = index % 9;

					// Add thicker borders to divide into 3x3 sections
					const isRightBorder = col === 2 || col === 5;
					const isBottomBorder = row === 2 || row === 5;
					let className = 'sudoku-cell';
					if (isRightBorder) {
						className += ' border-right-thick';
					}
					if (isBottomBorder) {
						className += ' border-bottom-thick';
					}

					// render as input for now, may become span later
					return (
						<input
							key={index}
							className={className}
							type="text"
							maxLength="1"
						/>
					);
				})}
			</div>
		</div>
	);
}
