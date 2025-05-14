const express = require('express');
const path = require('path');
require('./config/database'); 
require('dotenv').config();
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/auth', authRoutes);
app.use('/', blogRoutes);
app.use('/blogs', blogRoutes);
app.get('/', (req, res) => res.redirect('/blogs'));



// Routes
app.get('/', (req, res) => {
  res.send('Travel Blog Service Running');
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Blog service running on http://localhost:${PORT}`));
