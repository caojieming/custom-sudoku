import '../styles/SudokuBoard.css';

// gets and returns 1d index of cells with conflicts
function getConflicts(board) {
	const conflicts = new Set();
	for (let i = 0; i < 81; i++) {
		const valI = board[i].value;

		// skip if blank cell
		if (!valI) {
			continue;
		}

		const rowI = Math.floor(i / 9);
		const colI = i % 9;
		const boxI = Math.floor(rowI / 3) * 3 + Math.floor(colI / 3);

		for (let j = i + 1; j < 81; j++) {
			const valJ = board[j].value;
			if (!valJ) continue;

			if (valI === valJ) {
				const rowJ = Math.floor(j / 9);
				const colJ = j % 9;
				const boxJ = Math.floor(rowJ / 3) * 3 + Math.floor(colJ / 3);

				if (rowI === rowJ || colI === colJ || boxI === boxJ) {
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
	const isSolved = conflicts.size && !hasEmptyCells === 0;

	return (
		<div className="sudoku-container">
			<div className="sudoku-grid">
				{board.map((cell, idx) => {
					// idx is 1d indexing
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
