const express = require('express');
const { getUsers, createUser } = require('../controllers/user.controller');
const router = express.Router();




router.get('/get-user',getUsers);


router.post('/create-user',createUser);


module.exports = router;