const express = require('express');
const router = express.Router();

const apiKeyAuth = require('../middleware/apiKeyAuth'); // Middleware to validate the API key
const countryService = require('../services/countryService'); // Service that fetches and filters country data

// GET /api/countries – Protected API endpoint that returns filtered country data
router.get('/countries', apiKeyAuth, async (req, res) => {
  try {
    const countries = await countryService.getFilteredCountries(); // Fetch filtered country data
    res.json(countries); // Return it as JSON response
  } catch (err) {
    console.error('Error fetching countries:', err);
    res.status(500).json({ error: 'Failed to fetch country data' }); // Handle internal server errors
  }
});

module.exports = router; // Export this router to be used in app.js
