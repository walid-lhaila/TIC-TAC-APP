document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    let currentPlayer = 'X';

    const board = Array(20).fill(null).map(() => Array(20).fill(''));
    const players = JSON.parse(localStorage.getItem('players')) || [];

    const player1NameElem = document.getElementById('player1Name');
    const player2NameElem = document.getElementById('player2Name');

    if (players.length >= 2) {
        if (player1NameElem) {
            player1NameElem.textContent = players[players.length - 2].name;
        }
        if (player2NameElem) {
            player2NameElem.textContent = players[players.length - 1].name;
        }
    }
    if (container) {
        for (let i = 0; i < 400; i++) {
            const box = document.createElement('div');
            box.classList.add('box');
            container.appendChild(box);

            const row = Math.floor(i / 20);
            const col = i % 20;

            box.addEventListener('click', () => {
                if (box.textContent === '' && !WinnerCombination(board, row, col, currentPlayer)) {
                    box.textContent = currentPlayer;
                    box.classList.add(currentPlayer.toLowerCase());
                    board[row][col] = currentPlayer;
                    if(WinnerCombination(board, row, col, currentPlayer)){  
                        document.querySelector('.overlay').style.display = 'flex';
                        document.querySelector('.winnerCard h1').textContent = `Player ${currentPlayer} WIN'S`;    
                    
                        updateScore(currentPlayer);
                        saveScoresToLocalStorage(players);
                    }
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            });
        }

        const overlay = document.querySelector('.overlay');
        const playAgain = document.getElementById('playAgain');
        playAgain.addEventListener('click', () => {
            overlay.style.display = 'none';
            const boxes = document.querySelectorAll('.box');
            boxes.forEach(box => {
                box.textContent = '';
                box.classList.remove('x', 'o');
            });
            currentPlayer = 'X';
        })


        const replay = document.getElementById('replay');
        if (replay) {
            replay.addEventListener('click', () => {
                const boxes = document.querySelectorAll('.box');
                boxes.forEach(box => {
                    box.textContent = '';
                    box.classList.remove('x', 'o');
                });
                currentPlayer = 'X';
            });
        }
    }

    function WinnerCombination(board, row, col, player) {
        // Check horizontal
        if (direction(board, row, col, 0, 1, player) + direction(board, row, col, 0, -1, player) - 1 >= 5) {
            return true;
        }
        // Check vertical
        if (direction(board, row, col, 1, 0, player) + direction(board, row, col, -1, 0, player) - 1 >= 5) {
            return true;
        }
        // Check diagonal tl to br
        if (direction(board, row, col, 1, 1, player) + direction(board, row, col, -1, -1, player) - 1 >= 5) {
            return true;
        }
        // Check diagonal tr to bl
        if (direction(board, row, col, 1, -1, player) + direction(board, row, col, -1, 1, player) - 1 >= 5) {
            return true;
        }
        return false;
    }

    function direction(board, row, col, rowD, colD, player) {
        let count = 0;
        for(let i = 0; i < 5; i++ ){
            const r = row + i * rowD;
            const c = col + i * colD;


            if(r >= 0 && r <20 && c >= 0 && c < 20 && board[r][c] === player ){
                count++;
            }
            else{
                break;
            }
        }
        return count;
    }

    function updateScore(player) {
        const playerIndex = player === 'X' ? players.length - 2 : players.length - 1;
        players[playerIndex].score = (players[playerIndex].score || 0) + 1;
    }
    

    function saveScoresToLocalStorage(players) {
        localStorage.setItem('players', JSON.stringify(players));
    }

    const scoreTable = document.getElementById('scoreTable');
    players.forEach(player => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const scoreCell = document.createElement('td');

        nameCell.textContent = player.name;
        scoreCell.textContent = `${player.score || 0} WIN`;

        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        scoreTable.appendChild(row);
    });

});


