let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameOver = false;

function handleclick(cell) {
    const index = parseInt(cell.id);

    if (board[index] || gameOver) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    const winningCombo = checkWinner(currentPlayer);
    if (winningCombo) {
        displayMessage(`${currentPlayer} wins!`);
        highlightWinningCells(winningCombo);
        gameOver = true;
        return;
    }

    if (board.every(cell => cell !== null)) {
        displayMessage("It's a draw!");
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner(player) {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let combo of winCombinations) {
        if (combo.every(index => board[index] === player)) {
            return combo;
        }
    }
    return null;
}

function highlightWinningCells(combo) {
    combo.forEach(index => {
        document.getElementById(index).classList.add('win');
    });
}

function displayMessage(msg) {
    document.getElementById('message').textContent = msg;
}
