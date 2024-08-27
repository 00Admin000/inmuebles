
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');
    const cardForm = document.getElementById('card-form');
    const cardMessage = document.getElementById('card-message');

    // Manejo del botón de cerrar sesión
    logoutButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirige al inicio
    });

    // Manejo del formulario para agregar tarjetas
    cardForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(cardForm);
        const data = {
            image: formData.get('image'),
            title: formData.get('title'),
            description: formData.get('description'),
            phone: formData.get('phone'),
            type: formData.get('type')
        };

        fetch('/api/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                cardMessage.textContent = 'Tarjeta agregada exitosamente';
                cardForm.reset();
            } else {
                response.text().then(text => {
                    cardMessage.textContent = `Error: ${text}`;
                });
            }
        })
        .catch(error => {
            cardMessage.textContent = `Error: ${error.message}`;
        });
    });
});
