require('dotenv').config();

module.exports = {
  app: {
    port: process.env.PORT,
  },
  oracle: {
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONNECTION_STRING,
  }
}