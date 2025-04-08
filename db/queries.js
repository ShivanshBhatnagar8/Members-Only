const pool = require("./pool");

async function getUserById(id) {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return rows[0];
  } catch (error) {
    return error;
  }
}

async function getUserByEmail(email) {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return rows[0];
  } catch (error) {
    return error;
  }
}
async function createUser(firstName, lastName, email, password) {
  try {
    await pool.query(
      "INSERT INTO users (first_name,last_name,email,password) VALUES ($1,$2,$3,$4)",
      [firstName, lastName, email, password]
    );
  } catch (error) {
    return error;
  }
}

async function updatePassword(password, username) {
  try {
    const { rows } = await pool.query(
      "UPDATE users set password = $1 where email = $2 RETURNING id",
      [password, username]
    );
    return rows[0];
  } catch (error) {
    return error;
  }
}
async function getAllMessages() {
  try {
    const { rows } = await pool.query(
      "SELECT * ,(SELECT CONCAT (first_name, ' ', last_name) AS full_name FROM users WHERE users.id = messages.user_id) As user_name FROM messages"
    );
    return rows;
  } catch (error) {
    return error;
  }
}
async function createMessage(title, message, userId) {
  try {
    await pool.query(
      "INSERT INTO messages (title, message, user_id) VALUES($1,$2,$3)",
      [title, message, userId]
    );
  } catch (error) {
    return error;
  }
}

async function deleteMessage(messageId) {
  try {
    await pool.query("DELETE FROM messages where id=$1", [messageId]);
  } catch (error) {
    return error;
  }
}
module.exports = {
  getUserById,
  createUser,
  getUserByEmail,
  updatePassword,
  getAllMessages,
  createMessage,
  deleteMessage,
};
