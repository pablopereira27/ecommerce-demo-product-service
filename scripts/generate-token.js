dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const token = jwt.sign(
    { userId: 1, role: 'admin' },
    process.env.JWT_SECRET || process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
);

console.log('Generated token:\n', token);
