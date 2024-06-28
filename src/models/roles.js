const db = require("../db");

const getRoles = async () => {
  const query = "SELECT * FROM roles";
  const { rows } = await db.query(query);
  return rows;
};

const getRoleById = async (roleId) => {
  const query = "SELECT * FROM roles WHERE id = $1";
  const { rows } = await db.query(query, [roleId]);
  return rows[0];
};

const getRoleByName = async (role) => {
  const query = "SELECT * FROM roles WHERE name = $1";
  const { rows } = await db.query(query, [role]);
  return rows[0];
};

const createRole = async (roleData) => {
  const { name } = roleData;
  const query = "INSERT INTO roles(name) VALUES($1) RETURNING *";
  const { rows } = await db.query(query, [name]);
  return rows[0];
};

const updateRole = async (roleId, roleData) => {
  const { name } = roleData;
  const query = "UPDATE roles SET name = $1 WHERE id = $2 RETURNING *";
  const { rows } = await db.query(query, [name, roleId]);
  return rows[0];
};

const deleteRole = async (roleId) => {
  const query = "DELETE FROM roles WHERE id = $1 RETURNING *";
  const { rows } = await db.query(query, [roleId]);
  return rows[0];
};

module.exports = {
  getRoles,
  getRoleById,
  getRoleByName,
  createRole,
  updateRole,
  deleteRole,
};
