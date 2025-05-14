const axios = require('axios');

async function fetchCountries(apiKey) {
  try {
    const response = await axios.get('http://localhost:3001/api/countries', {
      headers: {
        'x-api-key': process.env.COUNTRY_API_KEY
      }
    });

    return response.data;
  } catch (err) {
    console.error('Error fetching countries:', err.message);
    return [];
  }
}

module.exports = { fetchCountries };
