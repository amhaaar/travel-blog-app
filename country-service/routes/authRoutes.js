const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

// Register form
router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

// Handle registration
router.post('/register', async (req, res) => {
  try {
    const success = await authService.register(req.body);
    if (success) {
      // Now log the user in by creating a session
      const user = await authService.login(req.body);
      req.session.user = { id: user.id, email: user.email }; // Set session
      res.redirect('/admin/dashboard');
    } else {
      res.render('register', { error: 'Email already exists' });
    }
  } catch (err) {
    res.render('register', { error: 'Error registering user' });
  }
});

// Login form
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Handle login
router.post('/login', async (req, res) => {
  try {
    const user = await authService.login(req.body);
    if (user) {
      req.session.user = { id: user.id, email: user.email };
      res.redirect('/admin/dashboard');
    } else {
      res.render('login', { error: 'Invalid email or password' });
    }
  } catch (err) {
    res.render('login', { error: 'Error logging in' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
});

module.exports = router;
