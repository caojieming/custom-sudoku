import '../styles/GenerateBoard.css';

// check if placing num at (row, col) is valid
function isValid(grid, row, col, num) {
    // check row and column
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num) {
            return false;
        }
        if (grid[i][col] === num) {
            return false;
        }
    }

    // check 3x3 subgrid
    const boxRowStart = Math.floor(row / 3) * 3;
    const boxColStart = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (grid[boxRowStart + r][boxColStart + c] === num) {
                return false;
            }
        }
    }

    return true;
}

// generates a solved board into the input board via backtracking
function fillGrid(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

                // shuffle the numbers array
                for (let i = nums.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    const temp = nums[i];
                    nums[i] = nums[j];
                    nums[j] = temp;
                }

                for (const num of nums) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (fillGrid(grid)) {
                            return true;
                        }
                        // backtrack
                        grid[row][col] = 0;
                    }
                }

                // trigger backtracking
                return false;
            }
        }
    }
    return true;
}

// generates a random solved board and clue indices order
export function generateSudokuPuzzle() {
    const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillGrid(grid);

    // convert 2D solved grid to 1D array of values
    const fullSolution = [];
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            fullSolution.push(grid[r][c].toString());
        }
    }

    // randomly select indices to keep as initial values
    const clueIndices = Array.from({ length: 81 }, (_, i) => i);
    for (let i = clueIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = clueIndices[i];
        clueIndices[i] = clueIndices[j];
        clueIndices[j] = temp;
    }

    return {
        fullSolution,
        clueIndices
    };
}

export function GenerateBoard({ onGenerate }) {
    const handleGenerate = () => {
        const puzzle = generateSudokuPuzzle();
        onGenerate(puzzle);
    };

    return (
        <div className="generate-container">
            <button className="generate-btn" onClick={handleGenerate}>
                Generate Board
            </button>
        </div>
    );
}
