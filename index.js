require("dotenv").config()
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./models/index');
const routes = require('./routes')
const app = express();
const allowedMethods = require('./utils/allowedMethods')
const PORT = 5001

app.use(express.json())
app.use(helmet()) // set security headers
app.use(cookieParser())
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json())
app.use("/",allowedMethods, routes)

app.listen(PORT,()=>{
    console.log(`Server listening on Port ${PORT}`);
    // sequelize.sync()

    sequelize.authenticate()
})