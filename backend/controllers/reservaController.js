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

// Crear una reserva
const crearReserva = async (req, res) => {
  try {
    const { id_vuelo, id_pasajero, id_asiento, precio } = req.body;

    // Crear la reserva
    const nuevaReserva = await Reserva.create({
      fecha_reserva: new Date(),
      estado: "en espera",
      id_vuelo,
      id_pasajero,
    });

    // Asignar asiento a la reserva
    await ReservaAsiento.create({
      precio,
      id_reserva: nuevaReserva.id_reserva,
      id_asiento,
    });

    res
      .status(201)
      .json({ mensaje: "Reserva creada exitosamente", reserva: nuevaReserva });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear reserva", error: error.message });
  }
};
module.exports = { obtenerReservas, obtenerReservaPorId, crearReserva };