const { Reserva, Pasajero, Vuelo, Asiento, ReservaAsiento } = require('../models/index');

// Obtener todas las reservas
const obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      include: [
        { model: Pasajero, attributes: { exclude: ['password'] } },
        { model: Vuelo }
      ]
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener reservas', error: error.message });
  }
};

module.exports = { obtenerReservas };