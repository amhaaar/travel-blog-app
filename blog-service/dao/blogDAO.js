const db = require('../config/database');

class BlogDAO {
  // Insert blog post into the database, including country
    async create({ title, content, author, country, user_id }) {
      const stmt = `INSERT INTO blogs (title, content, author, country, user_id)
                    VALUES (?, ?, ?, ?, ?)`;
      return new Promise((resolve, reject) => {
        db.run(stmt, [title, content, author, country, user_id], function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        });
      });
    }


  // Get all blog posts ordered by newest
  async getAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM blogs ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  // Get a single blog post by ID
  async getById(id) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM blogs WHERE id = ?`, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  async update(id, { title, content, country }) {
    const stmt = `UPDATE blogs SET title = ?, content = ?, country = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.run(stmt, [title, content, country, id], function (err) {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  async delete(id) {
    const stmt = `DELETE FROM blogs WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.run(stmt, [id], function (err) {
        if (err) reject(err);
        else resolve();
      });
    });
  }


  async getByUserId(userId) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM blogs WHERE user_id = ? ORDER BY created_at DESC`, [userId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}


}

module.exports = new BlogDAO();
