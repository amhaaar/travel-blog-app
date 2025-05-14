// Import bcrypt for password hashing and the data access layer for users
const bcrypt = require('bcrypt');
const authDAO = require('../dao/authDAO');

class AuthService {
  // Handles user registration
  async register({ email, password }) {
    // Check if the email is already registered
    const existing = await authDAO.findByEmail(email);
    if (existing) return false; // If user exists, registration fails

    // Hash the password for secure storage
    const hashed = await bcrypt.hash(password, 10);
    // Save the new user with the hashed password
    await authDAO.create({ email, password: hashed });
    return true; // Registration successful
  }

  // Handles user login
  async login({ email, password }) {
    // Look up the user by email
    const user = await authDAO.findByEmail(email);
    if (!user) return null; // User not found

    // Compare entered password with the hashed password in DB
    const match = await bcrypt.compare(password, user.password);
    if (!match) return null; // Password does not match

    // Remove password from the user object before returning
    delete user.password;
    return user; // Login successful, return user object
  }
}


module.exports = new AuthService();
