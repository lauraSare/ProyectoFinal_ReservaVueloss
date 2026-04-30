const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Asiento = sequelize.define('Asiento', {
    id_asiento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero_asiento: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    clase: {
        type: DataTypes.ENUM('turista', 'ejecutiva', 'primera clase'),
        allowNull: false
    },
    id_avion: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'asientos',
    timestamps: false
});

module.exports = Asiento;