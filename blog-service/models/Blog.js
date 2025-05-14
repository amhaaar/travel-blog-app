const db = require('../config/database');
const blogDAO = require('../dao/blogDAO');

class Blog {
  // Create a new blog post
  static async create(data) {
    return blogDAO.create(data);
  }

  // Get all blog posts with full blog info 
  static async findAll() {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT id, title, content, author, country, user_id, created_at FROM blogs ORDER BY created_at DESC`,
        [],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  // Get blog by ID
  static async findById(id) {
    return blogDAO.getById(id);
  }
}

module.exports = Blog;
