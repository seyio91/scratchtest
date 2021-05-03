const logger = require("../config/winston");
const { dbQuery } = require("./dbQuery");

const createUserTable = async () => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users
        (id SERIAL PRIMARY KEY,
            name VARCHAR (20) NOT NULL
            )`;
  try {
    await dbQuery(createTableQuery);
  } catch (error) {
    logger.error(error);
  }
};

const createTables = async () => {
  await createUserTable();
};

module.exports = createTables;
