const { Sequelize } = require('sequelize');
const PlaylistModel = require('./playlist');
const SongModel = require('./song');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
});

const Playlist = PlaylistModel(sequelize);
const Song = SongModel(sequelize);

// Relații
Playlist.hasMany(Song, { foreignKey: 'playlistId', onDelete: 'CASCADE' });
Song.belongsTo(Playlist, { foreignKey: 'playlistId' });

module.exports = { sequelize, Playlist, Song };