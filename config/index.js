const dotenv = require('dotenv');
const envFound = dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (envFound.error) {
 throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
 port: parseInt(process.env.PORT, 10),
 api: {
  prefix: '/api',
 },
}
