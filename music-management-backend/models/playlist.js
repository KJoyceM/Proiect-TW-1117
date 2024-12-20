const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Playlist = sequelize.define('Playlist', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
    });
    return Playlist;
};