const express = require('express')
const router = express.Router()
const loginApi = require('./login')
const getOneUser = require('./get_one_user')
const createPost = require('./create_post')
const getAllUsers = require('./getallusers')
const refreshToken = require('./token_refresh')
const registration = require('./register')


router.use(loginApi)
router.use(getOneUser)
router.use(getAllUsers)
router.use(refreshToken)
router.use(createPost)
router.use(registration)


 module.exports = router;