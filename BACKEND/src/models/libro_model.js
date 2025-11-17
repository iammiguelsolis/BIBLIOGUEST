const db = require('../config/db');

exports.getAllLibros = async (pagination = {}) => {

  const { page, limit } = pagination;
  const query = `
    SELECT * FROM LIBRO
    OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
  `;

  const offset = (page - 1) * limit;
  const queryParams = { limit, offset };
  
  const result = await db.query(query, queryParams);
  return result[0].rows;
}

exports.countLibros = async () => {
  const query = `
    SELECT COUNT(*) AS total FROM LIBRO
  `;
  const result = await db.query(query);
  return result[0].rows[0].TOTAL || 0;
}