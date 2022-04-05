// const pool = require('../db/connection');
// const pool = initPool();
const userRepository = require("../repositories/user-repository");

const addTodo = async (dto) => {
  const added = await userRepository.addTodo({title: dto.title, userId: dto.userId});
  return added;
};

const setTodoLists = async (dto) => {
  return await userRepository.setTodoLists(dto.userId);
};

const deleteTodo = async (dto) => {
  await userRepository.deleteTodo({ todoId: dto.todoId, userId: dto.userId });
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
