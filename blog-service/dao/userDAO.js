const db = require('../config/database');

class UserDAO {
  async create({ email, password }) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users (email, password) VALUES (?, ?)`,
        [email, password],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        }
      );
    });
  }

  async findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
}

module.exports = new UserDAO();
