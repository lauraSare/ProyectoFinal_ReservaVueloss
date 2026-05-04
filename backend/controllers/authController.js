const bcrypt = require('bcrypt');
const { Pasajero } = require('../models/index');

// Registro de nuevo pasajero
const registro = async (req, res) => {
  try {
    const { 
      nombre, 
      primer_apellido, 
      segundo_apellido, 
      correo, 
      telefono, 
      nacionalidad, 
      num_pasaporte, 
      password 
    } = req.body;

    // Verificar si el correo ya existe
    const existe = await Pasajero.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear pasajero
    const nuevoPasajero = await Pasajero.create({
      nombre,
      primer_apellido,
      segundo_apellido,
      correo,
      telefono,
      nacionalidad,
      num_pasaporte,
      password: hashedPassword
    });

    res.status(201).json({ 
      mensaje: 'Registro exitoso', 
      id: nuevoPasajero.id_pasajeros 
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

// Login de pasajero
const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // Buscar pasajero por correo
    const pasajero = await Pasajero.findOne({ where: { correo } });
    if (!pasajero) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Verificar contraseña
    const passwordValido = await bcrypt.compare(password, pasajero.password);
    if (!passwordValido) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Guardar sesión
    req.session.usuario = {
      id: pasajero.id_pasajeros,
      nombre: pasajero.nombre,
      correo: pasajero.correo
    };

    res.json({ mensaje: 'Login exitoso', usuario: req.session.usuario });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

// Cerrar sesión
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al cerrar sesión' });
    }
    res.json({ mensaje: 'Sesión cerrada exitosamente' });
  });
};

module.exports = { registro, login, logout };