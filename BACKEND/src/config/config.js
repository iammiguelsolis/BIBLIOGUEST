require('dotenv').config();

module.exports = {
  app: {
    port: process.env.PORT || 3000,
  },
  oracle: {
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONNECTION_STRING,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'biblioguest-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '8h'
  }
}