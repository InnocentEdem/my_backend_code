const express = require('express');
const router = express.Router()
const {getAllPostsByUser} = require("../controllers/userRoutes")

router.post("/get_user_posts",getAllPostsByUser)