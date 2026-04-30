const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ReservaAsiento = sequelize.define('ReservaAsiento', {
    id_reserva_asiento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    id_reserva: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_asiento: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'reserva_asiento',
    timestamps: false
});

module.exports = ReservaAsiento;