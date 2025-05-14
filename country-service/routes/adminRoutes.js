const express = require('express');
const router = express.Router();
const sessionAuth = require('../middleware/sessionAuth'); // Middleware to protect routes
const apiKeyService = require('../services/apiKeyService'); // Service for generating and retrieving API keys

// Dashboard route – shows the user's email and API key
router.get('/dashboard', sessionAuth, async (req, res) => {
  const apiKey = await apiKeyService.getUserApiKey(req.session.user.id); // Get the logged-in user's API key
  res.render('dashboard', {
    email: req.session.user.email,
    apiKey: apiKey ? apiKey.key : null, // Show API key if it exists
  });
});

// Route to generate a new API key (POST) and redirect back to dashboard
router.post('/api-keys', sessionAuth, async (req, res) => {
  await apiKeyService.generate(req.session.user.id); // Generate API key for the user
  res.redirect('/admin/dashboard');
});

// Route to render the countries viewer page
router.get('/countries', sessionAuth, (req, res) => {
  res.render('countries'); 
});

module.exports = router; 
