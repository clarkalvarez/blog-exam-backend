const db = require("../db");

const getPosts = async () => {
  const query = `
    SELECT * from posts   
  `;

  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw new Error(`Error fetching user by email ${email}: ${error.message}`);
  }
};

const getPostById = async (postId) => {
  const query = `
    SELECT *
    FROM posts
    WHERE id = $1
  `;
  const values = [postId];
  try {
    const { rows } = await db.query(query, values);
    return rows;
  } catch (error) {
    throw new Error(`Error fetching user by email ${email}: ${error.message}`);
  }
};

const createPost = async (postData) => {
  const { title, date, userId } = postData;
  const query =
    "INSERT INTO posts(title, date, user_id) VALUES($1, $2, $3) RETURNING *";
  const values = [title, date, userId];
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
  getPosts,
  getPostById,
  createPost,
};
