// Load the SQLite3 library and enable verbose logging for debugging
const sqlite3 = require('sqlite3').verbose();

// Load Node.js 'path' module to handle file paths
const path = require('path');

// Create and connect to SQLite database (stored in database.sqlite file in the same folder)
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Connected to SQLite');
  }
});

// Create database tables if they do not exist
db.serialize(() => {
  // Create 'users' table to store registered users
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,        -- Unique user ID
    email TEXT UNIQUE NOT NULL,                  -- User email (must be unique)
    password TEXT NOT NULL                       -- Hashed password
  )`);

  // Create 'api_keys' table to store API keys for each user
  db.run(`CREATE TABLE IF NOT EXISTS api_keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,        -- Unique key ID
    user_id INTEGER NOT NULL,                    -- ID of the user this key belongs to
    key TEXT UNIQUE NOT NULL,                    -- The actual API key (UUID)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp when key was created
    last_used DATETIME,                          -- Timestamp of last usage
    usage_count INTEGER DEFAULT 0,               -- Number of times key was used
    is_active BOOLEAN DEFAULT 1,                 -- Status of the key (active/inactive)
    FOREIGN KEY(user_id) REFERENCES users(id)    -- Link to 'users' table
  )`);

  // Create 'api_key_usage_log' table to store logs of API key usage per request
  db.run(`CREATE TABLE IF NOT EXISTS api_key_usage_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,        -- Unique log ID
    api_key TEXT NOT NULL,                       -- The API key that made the request
    endpoint TEXT NOT NULL,                      -- The endpoint accessed
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP -- When the request was made
  )`);
});


module.exports = db;
