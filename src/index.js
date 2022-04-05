//import
const express = require("express");
const bcryptjs = require("bcryptjs");
const cors = require("cors")
const handleAuth = require('../middlewares/handle-auth')

//import routes
const loginControllerRouter = require('../controllers/loginController');
const todoControllerRouter = require('../controllers/todoController');

//server config
const HOST = "localhost"
const PORT = "4000";

//initialize express app
const app = express();

app.listen(PORT, () =>
　console.log(`server is running on http://${HOST}:${PORT}`)
);

// set middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cors())

app.use('/login', loginControllerRouter);
app.use('/todo', todoControllerRouter);

app.get('/accounts/check-auth', handleAuth(), async (req, res) => {
  console.log("auth checked!")
  res.status(200).send('check auth');
});
