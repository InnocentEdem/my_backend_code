const express = require('express')
const router = express.Router();
const { sequelize,user,post,refresh_token } = require('../models');
const jwt = require("jsonwebtoken");
const refreshToken = require("../auth/tokenRefresh")

router.post("/token",refreshToken)
module.exports = router
