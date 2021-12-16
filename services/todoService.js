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

module.exports = addTodos
// exports.addTodos = addTodos;
