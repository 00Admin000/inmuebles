
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para manejar JSON
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Ruta para servir el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para servir el panel.html
app.get('/panel.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'panel.html'));
});

// Ruta para obtener las tarjetas
app.get('/api/cards', (req, res) => {
    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el archivo');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Ruta para agregar una tarjeta
app.post('/api/cards', (req, res) => {
    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el archivo');
            return;
        }

        const cards = JSON.parse(data);
        cards.cards.push(req.body); // Agrega la nueva tarjeta al array de tarjetas

        fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(cards, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error al guardar el archivo');
                return;
            }
            res.status(201).send('Tarjeta agregada');
        });
    });
});

// Ruta para manejar el inicio de sesión
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'KND' && password === 'Copo20') {
        res.status(200).send('Inicio de sesión exitoso');
    } else {
        res.status(401).send('Credenciales incorrectas');
    }
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
