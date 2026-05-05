const express = require('express');
const router = express.Router();
const { 
  obtenerVuelos, 
  obtenerVueloPorId, 
  crearVuelo, 
  actualizarVuelo, 
  eliminarVuelo 
} = require('../controllers/vueloController');

// Obtener todos los vuelos
router.get('/', obtenerVuelos);

// Obtener un vuelo por ID
router.get('/:id', obtenerVueloPorId);

// Crear un vuelo
router.post('/', crearVuelo);

// Actualizar un vuelo
router.put('/:id', actualizarVuelo);

// Eliminar un vuelo
router.delete('/:id', eliminarVuelo);

module.exports = router;