const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();

// Seguridad
app.use(helmet());

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Parseo de datos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sesiones
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 30 } //30 minutos
}));

// Flash messages
app.use(flash());

// Rutas
const rutas = require('./routes/rutas');
app.use('/', rutas);

// Puerto
const PORT = process.env.PORT || 3000;

// Conexion a BD e inicio del servidor
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos exitosa');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });

module.exports = app;