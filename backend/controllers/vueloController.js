const { Vuelo, Ruta, Avion } = require('../models/index');

// Obtener todos los vuelos
const obtenerVuelos = async (req, res) => {
  try {
    const vuelos = await Vuelo.findAll({
      include: [
        { model: Ruta },
        { model: Avion }
      ]
    });
    res.json(vuelos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener vuelos', error: error.message });
  }
};

// Crear un vuelo
const crearVuelo = async (req, res) => {
  try {
    const {
      codigo_vuelo,
      fecha_salida,
      fecha_llegada,
      estado,
      id_ruta,
      id_avion
    } = req.body;

    // Verificar si el codigo ya existe
    const existe = await Vuelo.findOne({ where: { codigo_vuelo } });
    if (existe) {
      return res.status(400).json({ mensaje: 'El código de vuelo ya existe' });
    }

    const nuevoVuelo = await Vuelo.create({
      codigo_vuelo,
      fecha_salida,
      fecha_llegada,
      estado,
      id_ruta,
      id_avion
    });

    res.status(201).json({ mensaje: 'Vuelo creado exitosamente', vuelo: nuevoVuelo });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear vuelo', error: error.message });
  }
};

module.exports = { obtenerVuelos, crearVuelo };