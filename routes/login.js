const express = require("express");
const router = express.Router();
const login = require('../controllers/loginAndRegistrationController')

router.post("/login",login.user_login)
module.exports = router;