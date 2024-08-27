
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            window.location.href = 'panel.html';
        } else {
            alert('Credenciales incorrectas');
        }
    })
    .catch(error => console.error('Error:', error));
}

function fetchCards() {
    fetch('/api/cards')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('cards-container');
            container.innerHTML = '';
            data.cards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.className = 'card';
                cardElement.innerHTML = `
                    <img src="${card.image}" alt="${card.title}">
                    <div class="content">
                        <h3>${card.title}</h3>
                        <p>${card.description}</p>
                        <p class="phone"><a href="tel:${card.phone}">${card.phone}</a></p>
                        <p class="type">${card.type}</p>
                    </div>
                `;
                cardElement.onclick = () => showModal(card);
                container.appendChild(cardElement);
            });
        })
        .catch(error => console.error('Error:', error));
}

function showModal(card) {
    const modal = document.getElementById('card-modal');
    const details = document.getElementById('card-details');
    details.innerHTML = `
        <img src="${card.image}" alt="${card.title}">
        <h3>${card.title}</h3>
        <p>${card.description}</p>
        <p class="phone"><a href="tel:${card.phone}">${card.phone}</a></p>
        <p class="type">${card.type}</p>
    `;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('card-modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCards();
});






















// script.js

document.addEventListener('DOMContentLoaded', () => {
    const pageTitle = document.getElementById('page-title');
    const loginContainer = document.getElementById('login-container');

    pageTitle.addEventListener('click', () => {
        // Alternar la visibilidad del formulario
        if (loginContainer.style.display === 'none' || loginContainer.style.display === '') {
            loginContainer.style.display = 'block';
        } else {
            loginContainer.style.display = 'none';
        }
    });
});
