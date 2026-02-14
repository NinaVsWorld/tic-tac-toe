const gameBoard = (() => {
    const board =
        [0, 0, 0,
         0, 0, 0,
         0, 0, 0];
    
    const winningCombos = [
        // rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // diagonals
        [0, 4, 8],
        [2, 4, 6]
    ]

    const markSpot = (index, mark) => {
        if (board[index] === 0) { 
            board[index] = mark; 
            return true
        }
        return false;
    }

    const checkWin = (player) => {
        for (const combo of winningCombos) {
            const a = combo[0];
            const b = combo[1];
            const c = combo[2];

            if (board[a] === player && board[b] === player && board[c] === player) {
                return true;
            }
        }
        return false;
    }

    const isBoardFull = () => {
        const full = arr => arr.every(i => i !== 0);
        return full(board);
    }

    const resetBoard = () => { board.fill(0); }
    const getBoard = () => { return board; }

    return { markSpot, checkWin, resetBoard, isBoardFull, getBoard }
})();

const createPlayer = (mark, name) => {
    const playerMark = mark;
    const playerName = name;
    const getPlayerMark = () => { return playerMark; }
    const getPlayerName = () => { return playerName; }
    return { getPlayerMark, getPlayerName }
}

const game = (player1, player2, gameBoard) => {
    const playerOne = player1;
    const playerTwo = player2;
    let currentPlayer = playerOne;
    let isGameOver = false;

    const switchPlayer = () => {
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        } else if (currentPlayer === playerTwo) {
            currentPlayer = playerOne;
        }
    }

    const playRound = (index) => {
        if (isGameOver) { return false; }
        const isMarked = gameBoard.markSpot(index, currentPlayer.getPlayerMark());
        if (!isMarked) { return false; }

        if (gameBoard.checkWin(currentPlayer.getPlayerMark())) {
            console.log(currentPlayer.getPlayerName() + " wins");
            isGameOver = true;
            return true;
        } else if (gameBoard.isBoardFull()) {
            console.log("Tie")
            isGameOver = true;
            return true;
        } else {
            switchPlayer();
            return true;
        }
    }

    const getGameStatus = () => { return isGameOver; }
    const resetGameStatus = () => { isGameOver = false };

    return { playRound, getGameStatus, resetGameStatus }
}

const displayGame = (() => {
    const cells = document.querySelectorAll(".grid div");
    const playerX = createPlayer("X", "Player X");
    const playerO = createPlayer("O", "Player O");
    const logic = game(playerX, playerO, gameBoard);

    const renderBoard = () => {
        let index = 0;
        for (const cell of cells) { 
            cell.classList.add("cell");
            cell.dataset.Index = index;
            index++;
        }
    }

    const markSpot = () => {
        for (const cell of cells) {
            cell.addEventListener("click", () => fillCell(cell));
        }
    }

    const fillCell = (cell) => {
        if (!logic.getGameStatus()) {
            const cellIndex = cell.dataset.Index;
            const canMark = logic.playRound(cellIndex);
            if (canMark) {
                cell.textContent = gameBoard.getBoard()[cellIndex];
            }
        }
    }

    /*const displayWin = () => {
        if (logic.getGameStatus()) {
            document.querySelector(".result").textContent = logic.currentPlayer().getPlayerName() + "wins";
        }
    }*/

    const eraseBoard = () => {
        document.querySelector("button").addEventListener("click", () => {
            clearBoard();
            gameBoard.resetBoard();
            logic.resetGameStatus();
        })
    }

    const clearBoard = () => {
        for (const cell of cells) {
            cell.textContent = '';
        }
    }

    return { renderBoard, markSpot, eraseBoard/*, displayWin*/ }
})();

displayGame.renderBoard();
displayGame.markSpot();
//displayGame.displayWin();
displayGame.eraseBoard();