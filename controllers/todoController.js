const express = require('express');
const addTodos = require('../services/todoService');
// const router = require('./loginController');

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

module.exports = router;