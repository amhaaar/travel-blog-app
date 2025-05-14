const bcrypt = require('bcrypt');
const userDAO = require('../dao/userDAO');

class AuthService {
  async register({ email, password }) {
    const existing = await userDAO.findByEmail(email);
    if (existing) return false;

    const hashed = await bcrypt.hash(password, 10);
    await userDAO.create({ email, password: hashed });
    return true;
  }

  async login({ email, password }) {
    const user = await userDAO.findByEmail(email);
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    delete user.password;
    return user;
  }
}

module.exports = new AuthService();
