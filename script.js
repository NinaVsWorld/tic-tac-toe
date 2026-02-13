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
        for (let i = 0; i < winningCombos.length; i++) {
            const combo = winningCombos[i];
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
    //const getBoard = () => { return board; }

    return { markSpot, checkWin, resetBoard, isBoardFull/*, getBoard */}
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
    const board = gameBoard;
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
        if (!isGameOver) {
            const isMarked = board.markSpot(index, currentPlayer.getPlayerMark());
            if (isMarked) {
                if (board.checkWin(currentPlayer.getPlayerMark())) {
                    console.log(currentPlayer.getPlayerName() + " wins");
                    isGameOver = true;
                } else if (board.isBoardFull()) {
                    console.log("Tie")
                    isGameOver = true;
                } else {
                    switchPlayer();
                }
            }
        }
    }

    const getGameStatus = () => { return isGameOver; }

    return { switchPlayer, playRound, getGameStatus }
}