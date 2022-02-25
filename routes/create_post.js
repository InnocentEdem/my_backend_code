const express = require('express');
const router = express.Router()
const auth = require("../auth")
const {createPost} = require("../controllers/userRoutes")

router.post("/create_post",auth,createPost)
module.exports = router