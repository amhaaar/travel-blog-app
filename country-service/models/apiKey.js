const sqlite3 = require('sqlite3').verbose(); // Enables verbose logging for SQLite
const path = require('path');
const db = require('../config/database'); // Reuses the database connection from your config

class ApiKey {
  // Static method to validate a given API key
  static async validate(key) {
    return new Promise((resolve, reject) => {
      // Check if the key exists and is active in the database
      db.get(
        'SELECT * FROM api_keys WHERE key = ? AND is_active = 1',
        [key],
        (err, row) => {
          if (err) return reject(err); // Handle DB errors

          // If the key is valid, update its last used timestamp and increment usage count
          if (row) {
            db.run(
              'UPDATE api_keys SET last_used = CURRENT_TIMESTAMP, usage_count = usage_count + 1 WHERE key = ?',
              [key]
            );
          }

          resolve(row);
        }
      );
    });
  }
}

module.exports = ApiKey; 
