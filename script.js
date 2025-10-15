const GRID_SIZE = 8;
const NUM_MINES = 10;
let board = [];
let isGameOver = false;
let cellsRevealed = 0;

const gridElement = document.getElementById('minesweeper-grid');
const messageElement = document.getElementById('game-message');
const resetButton = document.getElementById('reset-button');
const gameTitle = document.querySelector('h1');

function initGame() {
    board = [];
    isGameOver = false;
    cellsRevealed = 0;
    messageElement.textContent = '';
    gameTitle.textContent = 'Minesweeper'; // Reset title if it was BOOM!

    gridElement.innerHTML = ''; // Clear existing grid

    // Create board cells
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        board.push({
            id: i,
            row: Math.floor(i / GRID_SIZE),
            col: i % GRID_SIZE,
            hasMine: false,
            isRevealed: false,
            mineCount: 0 // Only relevant if not a mine
        });
    }

    placeMines();
    calculateMineCounts();
    renderBoard();
}

function placeMines() {
    let minesToPlace = NUM_MINES;
    while (minesToPlace > 0) {
        const randomIndex = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
        if (!board[randomIndex].hasMine) {
            board[randomIndex].hasMine = true;
            minesToPlace--;
        }
    }
}

function calculateMineCounts() {
    for (let i = 0; i < board.length; i++) {
        if (!board[i].hasMine) {
            board[i].mineCount = getNeighborMines(board[i].row, board[i].col);
        }
    }
}

function getNeighborMines(row, col) {
    let count = 0;
    const neighbors = getNeighbors(row, col);
    for (const neighbor of neighbors) {
        if (board[neighbor.id].hasMine) {
            count++;
        }
    }
    return count;
}

function getNeighbors(row, col) {
    const neighbors = [];
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue; // Skip the cell itself

            const newRow = row + dr;
            const newCol = col + dc;

            if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
                const neighborId = newRow * GRID_SIZE + newCol;
                neighbors.push(board[neighborId]);
            }
        }
    }
    return neighbors;
}

function renderBoard() {
    gridElement.innerHTML = ''; // Clear grid before rendering
    board.forEach(cell => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.id = cell.id;
        
        if (cell.isRevealed) {
            cellElement.classList.add('revealed');
            if (cell.hasMine) {
                cellElement.classList.add('mine');
                cellElement.textContent = '💣'; // Mine emoji
            } else if (cell.mineCount > 0) {
                cellElement.textContent = cell.mineCount;
                cellElement.dataset.mineCount = cell.mineCount; // For styling
            }
        }

        cellElement.addEventListener('click', handleCellClick);
        gridElement.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    if (isGameOver) return;

    const cellId = parseInt(event.target.dataset.id);
    const cell = board[cellId];

    if (cell.isRevealed) return; // Do nothing if already revealed

    if (cell.hasMine) {
        cell.isRevealed = true; // Mark clicked mine as revealed
        gameOver(false); // Game over due to mine
    } else {
        revealCell(cellId);
        // Check for win condition (all non-mine cells revealed)
        if (cellsRevealed === (GRID_SIZE * GRID_SIZE) - NUM_MINES) {
            gameOver(true); // Win condition
        }
    }
    renderBoard(); // Re-render the board after changes
}

function revealCell(id) {
    const cell = board[id];

    if (cell.isRevealed || cell.hasMine) return; // Don't reveal mines or already revealed cells

    cell.isRevealed = true;
    cellsRevealed++;

    // If it's an empty cell, recursively reveal neighbors
    if (cell.mineCount === 0) {
        const neighbors = getNeighbors(cell.row, cell.col);
        for (const neighbor of neighbors) {
            revealCell(neighbor.id);
        }
    }
}

function gameOver(isWin) {
    isGameOver = true;
    if (!isWin) {
        messageElement.textContent = 'BOOM! Game Over.';
        gameTitle.textContent = 'BOOM! Game Over.'; // Verification check
        // Reveal all mines
        board.forEach(cell => {
            if (cell.hasMine) {
                cell.isRevealed = true;
            }
        });
    } else {
        messageElement.textContent = 'Congratulations! You Won!';
        gameTitle.textContent = 'Minesweeper - YOU WON!';
    }
    renderBoard(); // Re-render to show all mines or final state
}

resetButton.addEventListener('click', initGame);

// Initial game setup
initGame();