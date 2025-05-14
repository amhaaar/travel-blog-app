const db = require('../config/database.js'); // your SQLite db connection
const ApiKey = require('../models/apiKey'); // existing validator

const apiKeyMiddleware = async (req, res, next) => {
    const apiKey = req.header('X-API-Key');

    if (!apiKey) {
        return res.status(401).json({ error: 'API key missing' });
    }

    try {
        const keyData = await ApiKey.validate(apiKey);
        if (!keyData) {
            return res.status(403).json({ error: 'Invalid API key' });
        }

        // ✅ Log into api_key_usage_log
        db.run(
            `INSERT INTO api_key_usage_log (api_key, endpoint) VALUES (?, ?)`,
            [apiKey, req.originalUrl],
            (err) => {
                if (err) console.error('Logging API key usage failed:', err.message);
            }
        );

        // ✅ Update usage_count and last_used
        db.run(
            `UPDATE api_keys
             SET usage_count = usage_count + 1,
                 last_used = CURRENT_TIMESTAMP
             WHERE key = ?`,
            [apiKey],
            (err) => {
                if (err) console.error('Failed to update API key stats:', err.message);
            }
        );

        // Attach key info to the request
        req.apiKey = keyData;

        next();

    } catch (error) {
        console.error('API key validation error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = apiKeyMiddleware;
