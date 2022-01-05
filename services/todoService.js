const initPool = require('../db/connection');
const pool = initPool();


const addTodos = (title) => {
          return new Promise((resolve, reject) => {
              pool.query(`INSERT INTO todo_data (title) VALUES (?)`,
              [
                  title
              ],
              (err, result) => {
                  if(err) {
                      return reject(err);
                  }
                  return resolve(result);
              })
          })
    }

const setTodoLists = () => {
        return new Promise((resolve, reject) => {
            pool.query(
            'SELECT * FROM todo_data',
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            })
        })
    }


exports.addTodos = addTodos;
exports.setTodoLists = setTodoLists;