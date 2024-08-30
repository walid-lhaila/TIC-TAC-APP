document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    let currentPlayer = 'X';

    if (container) {
        for (let i = 0; i < 400; i++) {
            const box = document.createElement('div');
            box.classList.add('box');
            container.appendChild(box);

            box.addEventListener('click', () => {
                if (box.textContent === '') {
                    box.textContent = currentPlayer;
                    box.classList.add(currentPlayer.toLowerCase());
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            });
        }

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
});