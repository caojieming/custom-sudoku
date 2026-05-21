import '../styles/SudokuBoard.css';

export function SudokuBoard({ board, onCellChange }) {
	return (
		<div className="sudoku-container">
			<div className="sudoku-grid">
				{board.map((cell, idx) => {
					const row = Math.floor(idx / 9);
					const col = idx % 9;

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

					if (cell.isInitial) {
						className += ' initial-cell';
						return (
							<span key={idx} className={className}>
								{cell.value}
							</span>
						);
					}

					className += ' input-cell';
					return (
						<input
							key={idx}
							className={className}
							type="text"
							maxLength="1"
							value={cell.value}
							onChange={(e) => onCellChange(idx, e.target.value)}
						/>
					);
				})}
			</div>
		</div>
	);
}
