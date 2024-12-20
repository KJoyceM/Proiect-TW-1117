const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, Playlist, Song } = require('./models');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoint-uri RESTful
// 1. Obține toate playlisturile
app.get('/playlists', async (req, res) => {
    const playlists = await Playlist.findAll({ include: Song });
    res.json(playlists);
});

// 2. Creează un playlist nou
app.post('/playlists', async (req, res) => {
    const playlist = await Playlist.create(req.body);
    res.status(201).json(playlist);
});

// 3. Adaugă o melodie într-un playlist
app.post('/playlists/:id/songs', async (req, res) => {
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });

    const song = await Song.create({ ...req.body, playlistId: req.params.id });
    res.status(201).json(song);
});

// Pornirea serverului
app.listen(3000, async () => {
    await sequelize.sync({ force: true }); // Resetare baza de date
    console.log('Server running on http://localhost:3000');
});