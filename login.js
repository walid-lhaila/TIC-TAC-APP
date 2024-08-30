document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    let playerId = 1;

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const playerName1 = document.getElementById('player1').value;
            const playerName2 = document.getElementById('player2').value;

            const firstPlayerError = document.getElementById('firstPlayerError');
            const secondPlayerError = document.getElementById('secondPlayerError');
            const regex = / /;
            if (playerName1.value.trime() === ""){
                firstPlayerError.textContent = "Please Enter Your Name";
            }else if (){

            }

            let players = JSON.parse(localStorage.getItem('players')) || [];

            players.push({ id: playerId++, name: playerName1, score: null });
            players.push({ id: playerId++, name: playerName2, score: null });
            
            localStorage.setItem('players', JSON.stringify(players));

            // Redirect to the game page
            window.location.href = 'game.html';
        });
    }
});