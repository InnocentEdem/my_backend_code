
const express = require('express');
const router = express.Router();
const {getAllUsers} = require('../controllers/adminControllers')


router.get("/all_users",getAllUsers)
module.exports = router