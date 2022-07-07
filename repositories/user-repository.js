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
  console.log("addtodo desu", dto.title.title)
  const res = await queryMySQL(
    `INSERT INTO todo_data (user_id, title, createdAt) VALUES (?, ?, ?)`,
    [dto.userId, dto.title, dto.createdAt]
  );
  console.log("repository", {id: res.insertId, title: dto.title, createdAt: dto.createdAt});
  return {id: res.insertId, title: dto.title, createdAt: dto.createdAt};
}

const setTodoLists = async (userId) => {
  const res = await queryMySQL(
  'SELECT * FROM todo_data WHERE user_id = ?',
  [userId]
  );
  return res;
}

const deleteTodo = async (dto) => {
  const res = await queryMySQL(
    `DELETE FROM todo_data WHERE id= ? AND user_id= ?`,
    [dto.todoId, dto.userId]
  );
  return res
}

const updateTodo = async (dto) => {
  const res = await queryMySQL(
    `UPDATE todo_data SET title=?, updatedAt=CONVERT_TZ(NOW(), '+00:00', '+09:00') WHERE id=? AND user_id=?`,
    [dto.title, dto.todoId, dto.userId, dto.updatedAt]
  )
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
