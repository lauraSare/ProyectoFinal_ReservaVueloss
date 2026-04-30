const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Reserva = sequelize.define('Reserva', {
    id_reserva: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_reserva: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.ENUM('confirmada', 'cancelada', 'en espera'),
        allowNull: false,
        defaultValue: 'en espera'
    },
    id_vuelo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_pasajero: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'reservas',
    timestamps: false
});

module.exports = Reserva;