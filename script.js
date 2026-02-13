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
        if (board[index] === 0) { board[index] = mark; }
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

    const resetBoard = () => { board.fill(0); }

    return { markSpot, checkWin, resetBoard }
})();

const createPlayer = (mark, name) => {
    const playerMark = mark;
    const playerName = name;
    const getPlayerMark = () => { return playerMark; }
    const getPlayerName = () => { return playerName; }
    return { getPlayerMark, getPlayerName }
}

const gameLogic = (() => {
    let currentPlayer;
    const setCurrentPlayer = (player) => { currentPlayer = player; }
    const switchPlayer = (newPlayer) => { setCurrentPlayer(newPlayer); }

    const playRound = (index) => {
        // obj.markSpot(index, mark)
        // const isEnd = checkwin for current player
        // if isend is false, switch players
    }

    return { setCurrentPlayer, switchPlayer, playRound }
})();