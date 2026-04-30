const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Pasajero = sequelize.define('Pasajero', {
    id_pasajeros: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    primer_apellido: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    segundo_apellido: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    correo: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    telefono: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    nacionalidad: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    num_pasaporte: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'pasajeros',
    timestamps: false
});

module.exports = Pasajero;