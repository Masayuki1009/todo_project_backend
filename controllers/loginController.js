const express = require('express');
// const handleAuth = require('../middlewares/handle-auth');
const { signup, signin }  = require('../services/loginService');

const router = express.Router();

router.post('/signup', async (req, res)  => {
    try {
        const { email, password } = req.body;
        const result = await signup(email, password);
        // console.log(result)
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        return res.status(500).send('failed to insert')
    }
})


router.post('/signin' ,async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await signin({ email, password });//変えた
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).send('failed to insert')
    }
})

module.exports = router;