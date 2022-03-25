
// do only access DB by query
const queryMySQL = require("../db/connection");

const saveOne = async (email, hashedPassword) => {
  console.log("signup");
  const res = await queryMySQL(
    `INSERT INTO login_data (email, password) VALUES (?, ?)`,
    [email, hashedPassword]
  );
  return res;
};

const findByEmail = async (email) => {
  const res = await queryMySQL(
    `SELECT * FROM login_data where email = ?`,
    [email]
  );
  return res;
};

const addTodo = async (title) => {
  const res = await queryMySQL(
    `INSERT INTO todo_data (title) VALUES (?)`,
    [title]
  );
  console.log("repository", {id: res.insertId, title});
  return {id: res.insertId, title};
}

// need userid to recognise user
const setTodoLists = async () => {
  const res = await queryMySQL('SELECT * FROM todo_data');
  // console.log("settodolists", res)
  return res;
}

const deleteTodo = async (id) => {
  const res = await queryMySQL(
    `DELETE FROM todo_data WHERE id= ?`,
    [id]
  );
  return res
}

const updateTodo = async (title, id) => {
  const res = await queryMySQL(
    `UPDATE todo_data SET title=? WHERE id=?`,
    [title, id]
  )
  console.log(res)
  return res
}


module.exports = {
  saveOne,
  findByEmail,
  addTodo,
  setTodoLists,
  deleteTodo,
  updateTodo,
};
