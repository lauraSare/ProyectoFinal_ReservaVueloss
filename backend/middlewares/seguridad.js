const helmet = require("helmet");

// Prevenir acceso a directorios
const noAccesoDirectorios = (req, res, next) => {
  const rutasProhibidas = ["/backend", "/models", "/controllers", "/config"];
  if (rutasProhibidas.some((ruta) => req.path.startsWith(ruta))) {
    return res.status(403).json({ mensaje: "Acceso prohibido" });
  }
  next();
};

// Verificar timeout de sesión (30 minutos)
const verificarTimeout = (req, res, next) => {
  if (req.session.usuario) {
    const ahora = Date.now();
    const ultimaActividad = req.session.ultimaActividad || ahora;
    const tiempoInactivo = ahora - ultimaActividad;
    const treintaMinutos = 30 * 60 * 1000;

    if (tiempoInactivo > treintaMinutos) {
      req.session.destroy();
      return res
        .status(401)
        .json({ mensaje: "Sesión expirada, inicia sesión nuevamente" });
    }

    // Actualizar ultima actividad
    req.session.ultimaActividad = ahora;
  }
  next();
};

module.exports = { noAccesoDirectorios, verificarTimeout };
