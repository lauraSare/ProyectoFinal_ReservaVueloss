const express = require("express");
const router = express.Router();
const {
  obtenerReservas,
  obtenerReservaPorId,
  crearReserva,
  actualizarReserva,
  eliminarReserva,
} = require("../controllers/reservaController");

// Obtener todas las reservas
router.get("/", obtenerReservas);

// Obtener una reserva por ID
router.get("/:id", obtenerReservaPorId);

// Crear una reserva
router.post("/", crearReserva);

// Actualizar una reserva
router.put("/:id", actualizarReserva);

// Eliminar una reserva
router.delete("/:id", eliminarReserva);

module.exports = router;
