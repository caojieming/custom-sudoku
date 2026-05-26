import '../styles/SudokuBoard.css';

// gets and returns 1d index of cells with conflicts
export function getConflicts(board) {
	const conflicts = new Set();
	for (let i = 0; i < 81; i++) {
		const val1 = board[i].value;

		// skip if blank cell
		if (!val1) {
			continue;
		}

		const row1 = Math.floor(i / 9);
		const col1 = i % 9;
		const box1 = Math.floor(row1 / 3) * 3 + Math.floor(col1 / 3);

		for (let j = i + 1; j < 81; j++) {
			const val2 = board[j].value;
			if (!val2) continue;

			if (val1 === val2) {
				const row2 = Math.floor(j / 9);
				const col2 = j % 9;
				const box2 = Math.floor(row2 / 3) * 3 + Math.floor(col2 / 3);

				if (row1 === row2 || col1 === col2 || box1 === box2) {
					conflicts.add(i);
					conflicts.add(j);
				}
			}
		}
	}
	return conflicts;
}

export function SudokuBoard({ board, onCellChange }) {
	const conflicts = getConflicts(board);
	const hasEmptyCells = board.some(cell => cell.value === '');
	const isSolved = conflicts.size === 0 && !hasEmptyCells;

	return (
		<div className="sudoku-container">
			<div className="sudoku-grid">
				{board.map((cell, idx) => {
					// idx is 1d indexing
					const row = Math.floor(idx / 9);
					const col = idx % 9;

					// add thicker borders to divide into 3x3 sections
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

					// validation styling based on value and board state
					if (cell.value !== '') {
						if (isSolved) {
							className += ' correct-cell';
						} else if (conflicts.has(idx)) {
							className += ' invalid-cell';
						} else {
							className += ' valid-cell';
						}
					}

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
