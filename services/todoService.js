// const pool = require('../db/connection');
// const pool = initPool();
const userRepository = require("../repositories/user-repository");

const addTodo = async (title) => {
  const added = await userRepository.addTodo(title);
  return added;
};

const setTodoLists = async () => {
  return await userRepository.setTodoLists();
};

const deleteTodo = async (id) => {
  await userRepository.deleteTodo(id);
};

const updateTodo = async (title, id) => {
  await userRepository.updateTodo(title, id);
};

module.exports = {
  addTodo,
  setTodoLists,
  deleteTodo,
  updateTodo,
};
