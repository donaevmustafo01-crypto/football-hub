const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.FOOTBALL_API_KEY || 'aa9a959523d14aa3b65bd8bbfad14629';
const BASE = 'https://api.football-data.org/v4';

app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// API PROXY
app.get('/api/*', async (req, res) => {
  const endpoint = req.params[0];
  const query = req.url.split('?')[1] ? '?' + req.url.split('?')[1] : '';
  const url = `${BASE}/${endpoint}${query}`;

  try {
    const response = await fetch(url, {
      headers: { 'X-Auth-Token': API_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Football Hub running on port ${PORT}`));
