const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Vuelo = sequelize.define('Vuelo', {
    id_vuelos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo_vuelo: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    fecha_salida: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_llegada: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('programado', 'retrasado', 'cancelado', 'completado'),
        allowNull: false,
        defaultValue: 'programado'
    },
    id_ruta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_avion: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'vuelos',
    timestamps: false
});

module.exports = Vuelo;