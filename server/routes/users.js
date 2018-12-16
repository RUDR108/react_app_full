const express = require('express')
const Users = require('../controllers/users')
const router = express.Router()

router.post('/auth',Users.auth)

router.post('/register',Users.register)

module.exports=router;