const express = require('express')
const router = express.Router()
const {getOneUser} = require('../controllers/adminControllers')


router.get("/user/:uuid",getOneUser)
module.exports = router