// Import the SQLite database connection
const db = require('../config/database');

class AuthDAO {
  // Create a new user in the database
  async create({ email, password }) {
    const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
    // Inserts the provided email and hashed password into the users table
    return db.run(sql, [email, password]);
  }

  // Find a user in the database by their email
  async findByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = ?`;
    return new Promise((resolve, reject) => {
      db.get(sql, [email], (err, row) => {
        if (err) reject(err); // If an error occurs during query, reject the promise
        else resolve(row);    // If found, return the user row
      });
    });
  }
}

// Export a single instance of AuthDAO for reuse
module.exports = new AuthDAO();
