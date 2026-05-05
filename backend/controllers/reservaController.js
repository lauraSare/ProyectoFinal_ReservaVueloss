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

// Obtener una reserva por ID
const obtenerReservaPorId = async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.id, {
      include: [
        { model: Pasajero, attributes: { exclude: ['password'] } },
        { model: Vuelo },
        { model: ReservaAsiento, include: [{ model: Asiento }] }
      ]
    });
    if (!reserva) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    }
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener reserva', error: error.message });
  }
};

module.exports = { obtenerReservas, obtenerReservaPorId };