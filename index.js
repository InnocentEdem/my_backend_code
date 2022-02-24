require("dotenv").config()
const bodyParser = require('body-parser')
const express = require('express');
const morgan = require('morgan');
const { sequelize,user,post,refresh_token } = require('./models/index');
const routes = require('./routes')
const app = express();
const jwt = require("jsonwebtoken");
const PORT = 5001

app.use(morgan('tiny'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json())

app.use("/", routes)

app.listen(PORT,()=>{
    console.log(`Server listening on Port ${PORT}`);
    sequelize.authenticate()
})