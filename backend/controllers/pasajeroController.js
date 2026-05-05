const { Pasajero } = require('../models/index');

// Obtener todos los pasajeros
const obtenerPasajeros = async (req, res) => {
  try {
    const pasajeros = await Pasajero.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(pasajeros);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener pasajeros', error: error.message });
  }
};

// Obtener un pasajero por ID
const obtenerPasajeroPorId = async (req, res) => {
  try {
    const pasajero = await Pasajero.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!pasajero) {
      return res.status(404).json({ mensaje: 'Pasajero no encontrado' });
    }
    res.json(pasajero);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener pasajero', error: error.message });
  }
};

module.exports = { obtenerPasajeros, obtenerPasajeroPorId };