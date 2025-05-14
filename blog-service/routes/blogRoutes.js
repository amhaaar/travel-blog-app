const express = require('express');
const router = express.Router();
const blogDAO = require('../dao/blogDAO');
const { fetchCountries } = require('../services/countryService');
const Blog = require('../models/Blog');

// GET all blog posts (with optional country filter)
router.get('/', async (req, res) => {
  const selectedCountry = req.query.country || null;
  const apiKey = '44c4560e-9f82-433f-b15e-1b69d8abf83b';
  let blogs = await Blog.findAll();
  const countries = await fetchCountries(apiKey);

  if (selectedCountry) {
    blogs = blogs.filter(b => b.country === selectedCountry);
  }

  res.render('index', { blogs, countries, selectedCountry, user: req.session.user });
});

// GET the blog submission form
router.get('/new', async (req, res) => {
  const apiKey = '44c4560e-9f82-433f-b15e-1b69d8abf83b';
  const countries = await fetchCountries(apiKey);
  res.render('new', { countries });
});

// GET the blog submission form
router.get('/new', async (req, res) => {
  const apiKey = '44c4560e-9f82-433f-b15e-1b69d8abf83b';
  const countries = await fetchCountries(apiKey);
  res.render('new', { countries, user: req.session.user });
});

// POST a new blog post
router.post('/new', async (req, res) => {
  const { title, content, author, country } = req.body;
  const userId = req.session.user?.id;

  try {
    await blogDAO.create({ title, content, author, country, user_id: userId });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving blog post');
  }
});

// GET edit form
  router.get('/:id/edit', async (req, res) => {
    const apiKey = '44c4560e-9f82-433f-b15e-1b69d8abf83b';
    const blog = await blogDAO.getById(req.params.id);
    const countries = await fetchCountries(apiKey);

    if (!blog) return res.status(404).send('Blog not found');
    if (!req.session.user || blog.user_id !== req.session.user.id) {
      return res.status(403).send('Unauthorized');
    }

    res.render('edit', { blog, countries, user: req.session.user });
  });

// POST update blog
  router.post('/:id/edit', async (req, res) => {
  const blog = await blogDAO.getById(req.params.id);

  if (!req.session.user || blog.user_id !== req.session.user.id) {
    return res.status(403).send('Unauthorized');
  }
  const { title, content, country } = req.body;

  try {
    await blogDAO.update(req.params.id, { title, content, country });
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error updating blog');
  }
});


// POST delete blog
router.post('/:id/delete', async (req, res) => {
  const blog = await blogDAO.getById(req.params.id);

  if (!req.session.user || blog.user_id !== req.session.user.id) {
    return res.status(403).send('Unauthorized');
  }
  try {
    await blogDAO.delete(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error deleting blog');
  }
});


// My Blogs - only posts by current user
router.get('/my-blogs', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }

  try {
    const userBlogs = await blogDAO.getByUserId(req.session.user.id);
    res.render('my-blogs', { blogs: userBlogs, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching your blogs');
  }
});



module.exports = router;
