const express = require('express');
const { addTodos, setTodoLists }  = require('../services/todoService');


const router = express.Router();


router.post('/add', async (req, res) => {
          try {
              const { title } = req.body;
              console.log({ title })
              const result = await addTodos(title);
              return res.status(200).json(result);
          } catch (error) {
              return res.status(500).send('failed to insert')
          }
      })

router.get('/get', async (req, res) => {
    try {
        const result = await setTodoLists()
        return res.status(200).json(result)
    }catch (error) {
        return res.status(500).send('failed to insert')
    }
})

module.exports = router;