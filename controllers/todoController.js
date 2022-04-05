const express = require('express');
const handleAuth = require('../middlewares/handle-auth');
const todoService = require('../services/todoService');
const router = express.Router();

router.post('/add', handleAuth(), async (req, res) => {
          try {
              const { title } = req.body;
              const result = await todoService.addTodo({title, userId: req.user.id})
              return res.status(200).json(result);
          } catch (error) {
              return res.status(500).send('failed to insert')
          }
      })

router.get('/get', handleAuth(), async (req, res) => {
    try {
        const result = await todoService.setTodoLists({ userId: req.user.id })
        return res.status(200).json(result)
    }catch (error) {
        console.log(error)
        return res.status(500).send('failed to insert')
    }
})

router.delete('/delete/:id', handleAuth(), async (req, res) => {
    try {
        const todoId = req.params.id
        const result = await todoService.deleteTodo({ todoId, userId: req.user.id })
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).send('failed to insert')
    }
})

router.put('/update/:id', handleAuth(), async (req, res) => {
    try {
        const { title } = req.body;
        const todoId = req.params.id
        await todoService.updateTodo({ title, todoId, userId: req.user.id})

        res.status(200).send();
    } catch (error) {
        return res.status(500).send('failed to insert')
    }
})

module.exports = router;