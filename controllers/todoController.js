const express = require('express');
const todoService = require('../services/todoService');
const router = express.Router();

router.post('/add', async (req, res) => {
          try {
              const { title } = req.body;
              console.log("title", { title });
              const result = await todoService.addTodo(title)
              console.log("result", result);
              
              return res.status(200).json(result);
          } catch (error) {
              return res.status(500).send('failed to insert')
          }
      })

router.get('/get', async (req, res) => {
    try {
        const result = await todoService.setTodoLists()
        // const a = result.map((data) => (data))
        console.log("todoController", result)
        return res.status(200).json(result)
    }catch (error) {
        console.log(error)
        return res.status(500).send('failed to insert')
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = await todoService.deleteTodo(id)
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).send('failed to insert')
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const { title } = req.body;
        const id = req.params.id

        await todoService.updateTodo(title, id)

        res.status(200).send();
    } catch (error) {
        return res.status(500).send('failed to insert')
    }
})

module.exports = router;