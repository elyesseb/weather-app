const db = require('./database');
const express = require('express');
const app = express();
const weatherUtils = require('./weatherUtils');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

// a ajouter pour la communication entre le front et le back en dev lorsque express est instancié
app.use(
  cors({
    credentials: true,
  })
);

// Initialisation de la base avec les deux tables nécessaires (à garder)
db.init();

// ex : http://localhost:3000/cities
app.get('/cities', async (req, res) => {
  try {
    const cities = await db.all('SELECT insee, name, zipcode, population FROM city');
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ex : http://localhost:3000/cities/13212/forecast
app.get('/cities/:codeInsee/forecast', async (req, res) => {
  const codeInsee = req.params.codeInsee;

  try {
    // Besoin de configurez la clé api dans un fichier .env
    const apiKey = process.env.METEO_API_KEY;
    const apiUrl = `https://api.meteo-concept.com/api/forecast/daily/0?token=${apiKey}&insee=${codeInsee}`;

    const response = await axios.get(apiUrl);

    // Récupérez les données de prévisions depuis la réponse de l'API
    const forecasts = response.data;

    // Ajoutez l'icône basée sur le code de temps
    const weatherCode = forecasts.forecast.weather;
    const icon = weatherUtils.getIconByCode(weatherCode);

    // Ajoutez l'icône à la réponse JSON
    forecasts.icon = icon;

    res.json(forecasts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});