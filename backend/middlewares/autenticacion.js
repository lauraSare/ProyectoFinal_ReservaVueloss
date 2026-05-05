// Verificar si el usuario está autenticado
const verificarSesion = (req, res, next) => {
  if (!req.session.usuario) {
    return res
      .status(401)
      .json({ mensaje: "No autorizado, inicia sesión primero" });
  }
  next();
};

module.exports = { verificarSesion };
