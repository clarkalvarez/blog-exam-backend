const db = require("../db");

const getUsers = async () => {
  const query = `SELECT * FROM users`;

  try {
    const { rows } = await db.query(query);

    return rows;
  } catch (error) {
    throw new Error(`Error fetching user by email ${email}: ${error.message}`);
  }
};

const getUserById = async (userId) => {
  const query = `
    SELECT users.id, users.name, users.email, users.password, roles.id AS roleid, roles.name AS rolename
    FROM users
    LEFT JOIN roles ON users.role_id = roles.id
    WHERE users.id = $1
  `;
  const values = [userId];
  try {
    const { rows } = await db.query(query, values);
    if (rows.length > 0) {
      const user = rows[0];
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      };
    }
    return null;
  } catch (error) {
    throw new Error(`Error fetching user by email ${email}: ${error.message}`);
  }
};

const getUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users 
    WHERE users.email = $1
  `;
  const values = [email];
  try {
    const { rows } = await db.query(query, values);
    return rows;
  } catch (error) {
    throw new Error(`Error fetching user by email ${email}: ${error.message}`);
  }
};

const createUser = async (userData) => {
  const { name, email, password } = userData;
  const query =
    "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *";
  const values = [name, email, password];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const updateUser = async (userId, userData) => {
  const { name, email, password, roleId } = userData;
  const query =
    "UPDATE users SET name = $1, email = $2, password = $3, role_id = $4 WHERE id = $5 RETURNING *";
  const values = [name, email, password, roleId, userId];
  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error(`Error updating user with ID ${userId}: ${error.message}`);
  }
};

const deleteUser = async (userId) => {
  const query = "DELETE FROM users WHERE id = $1 RETURNING *";
  const { rows } = await db.query(query, [userId]);
  return rows[0];
};

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
