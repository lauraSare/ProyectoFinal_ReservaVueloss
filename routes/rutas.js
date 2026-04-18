const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Bienvenido al Sistema de Reserva de Vuelos');
});

module.exports = router;