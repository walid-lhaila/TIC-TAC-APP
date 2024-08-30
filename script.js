document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');

    for(var i = 0; i < 400; i++){
        const box = document.createElement('div');
        box.classList.add('box');
        container.appendChild(box);
    }
})

const historique = document.getElementById('list');
const btn = document.getElementById('historiqueBtn');
btn.addEventListener('click', () => {
    if(historique.style.display == 'none'){
        historique.style.display = 'block';
    }else {
        historique.style.display = 'none';
    }

})