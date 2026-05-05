const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
require("dotenv").config();
const { conectarDB } = require("./config/database");
const {
  noAccesoDirectorios,
  verificarTimeout,
} = require("./middlewares/seguridad");
const { verificarSesion } = require("./middlewares/autenticacion");

const app = express();

// Middlewares de seguridad
app.use(helmet());
app.use(noAccesoDirectorios);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sesión
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secreto123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 30, // 30 minutos
    },
  }),
);

// Verificar timeout de sesión
app.use(verificarTimeout);

// Conectar a la BD
conectarDB();

// Rutas públicas (no requieren sesión)
app.use("/api/auth", require("./routes/autenticacion"));

// Rutas protegidas (requieren sesión)
app.use("/api/vuelos", verificarSesion, require("./routes/vuelos"));
app.use("/api/pasajeros", verificarSesion, require("./routes/pasajeros"));
app.use("/api/reservas", verificarSesion, require("./routes/reservas"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
