const express = require('express')
const router = express.Router()
const register = require('../controllers/loginAndRegistrationController')

router.post("/register", register.register_new_user)
module.exports = router