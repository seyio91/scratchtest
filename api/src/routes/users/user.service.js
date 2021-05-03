const { dbQuery } = require("../../db/dbQuery");

// Creates my User
const createUser = async (name) => {
  let insertQuery = `INSERT INTO users(name) VALUES($1) RETURNING * `;
  let params = [name];
  const { rows } = await dbQuery(insertQuery, params);
  return rows[0];
};

// Cets all User
const getUsers = async () => {
  let totalQuery = "SELECT * FROM users";
  const { rows } = await dbQuery(totalQuery);
  return rows;
};

// Get a User
const getUserbyID = async (id) => {
  let userQuery = `SELECT * FROM users WHERE id = ${id} LIMIT 1`;
  const { rows } = await dbQuery(userQuery);
  if (rows.length == 0) {
    throw new Error("User not Found");
  }
  return rows[0];
};

module.exports = {
  createUser,
  getUsers,
  getUserbyID,
};
