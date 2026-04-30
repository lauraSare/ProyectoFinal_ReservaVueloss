const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Avion = sequelize.define('Avion', {
    id_avion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    matricula: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    modelo: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    fabricante: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    capacidad_total: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'aviones',
    timestamps: false
});

module.exports = Avion;