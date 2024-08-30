document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    let playerId = 1;

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const playerName1 = document.getElementById('player1').value.trim();
            const playerName2 = document.getElementById('player2').value.trim();

            const firstPlayerError = document.getElementById('firstPlayerError');
            const secondPlayerError = document.getElementById('secondPlayerError');
            const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ'-]{2,50}( [A-Za-zÀ-ÖØ-öø-ÿ'-]{2,50})*$/;

            let valid = true;

            if (playerName1 === "") {
                firstPlayerError.textContent = "Please Enter Your Name";
                valid = false;
            } else if (!regex.test(playerName1)) {
                firstPlayerError.textContent = "Please Enter a Valid Name";
                valid = false;
            } else {
                firstPlayerError.textContent = "";
            }

            if (playerName2 === "") {
                secondPlayerError.textContent = "Please Enter Your Name";
                valid = false;
            } else if (!regex.test(playerName2)) {
                secondPlayerError.textContent = "Please Enter a Valid Name";
                valid = false;
            } else {
                secondPlayerError.textContent = "";
            }

            if (valid) {
                let players = JSON.parse(localStorage.getItem('players')) || [];

                players.push({ id: playerId++, name: playerName1, score: null });
                players.push({ id: playerId++, name: playerName2, score: null });

                localStorage.setItem('players', JSON.stringify(players));

                window.location.href = 'game.html';
            }
        });
    }
});
