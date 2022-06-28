// const pool = require('../db/connection');
// const pool = initPool();
const userRepository = require("../repositories/user-repository");

const addTodo = async (dto) => {
  console.log("addtodo", dto)
  const added = await userRepository.addTodo({title: dto.title, userId: dto.userId, createdAt: dto.createdAt });
  console.log("added", added)
  return added;
};

const setTodoLists = async (dto) => {
  return await userRepository.setTodoLists(dto.userId);
};

const deleteTodo = async (dto) => {
  await userRepository.deleteTodo({ todoId: dto.todoId, userId: dto.userId });
};

const updateTodo = async (dto) => {
  await userRepository.updateTodo({ title: dto.title, todoId: dto.todoId, userId: dto.userId });
};

module.exports = {
  addTodo,
  setTodoLists,
  deleteTodo,
  updateTodo,
};
