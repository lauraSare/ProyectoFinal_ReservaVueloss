const { Pasajero } = require('../models/index');

// Obtener todos los pasajeros
const obtenerPasajeros = async (req, res) => {
  try {
    const pasajeros = await Pasajero.findAll({
      attributes: { exclude: ['password'] } // nunca enviamos la contraseña
    });
    res.json(pasajeros);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener pasajeros', error: error.message });
  }
};

module.exports = { obtenerPasajeros };