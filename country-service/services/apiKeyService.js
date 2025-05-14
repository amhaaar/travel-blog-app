// Import the UUID generator and the DAO (Data Access Object) for API keys
const { v4: uuidv4 } = require('uuid');
const apiKeyDAO = require('../dao/apiKeyDAO');

class ApiKeyService {
  // Method to generate a new API key for a user
  async generate(userId) {
    // Check if the user already has an active API key
    const existing = await apiKeyDAO.findByUserId(userId);
    if (existing) return existing; 

    // Generate a new unique key using UUID
    const key = uuidv4();
    // Save the new key in the database
    await apiKeyDAO.create({ userId, key });
    return key;
  }

  // Method to retrieve a user's existing API key
  async getUserApiKey(userId) {
    return await apiKeyDAO.findByUserId(userId);
  }
}


module.exports = new ApiKeyService();
