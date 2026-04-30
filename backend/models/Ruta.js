const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Ruta = sequelize.define('Ruta', {
    id_ruta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    distancia_km: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    duracion_estimada: {
        type: DataTypes.TIME,
        allowNull: false
    },
    id_origen: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_destino: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'rutas',
    timestamps: false
});

module.exports = Ruta;