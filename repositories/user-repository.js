
// do only access DB by query
const queryMySQL = require("../db/connection");

const saveOne = async (user) => {
  console.log("signup");
  const res = await queryMySQL(
    `INSERT INTO login_data (email, password) VALUES (?, ?)`,
    [user.email, user.password]
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

const addTodo = async (dto) => {
  const res = await queryMySQL(
    `INSERT INTO todo_data (user_id, title) VALUES (?, ?)`,
    [dto.userId, dto.title]
  );
  console.log("repository", {id: res.insertId, title: dto.title});
  return {id: res.insertId, title: dto.title};
}

// need userid to recognise user
const setTodoLists = async (userId) => {
  const res = await queryMySQL('SELECT * FROM todo_data WHERE user_id = ?',
  [userId]
  );
  // console.log("settodolists", res)
  return res;
}

const deleteTodo = async (dto) => {
  const res = await queryMySQL(
    `DELETE FROM todo_data WHERE id= ? AND user_id= ?`,
    [dto.todoId, dto.userId]
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
