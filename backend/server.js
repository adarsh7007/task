const express = require('express')
const Port = process.env.PORT || 2000;
const app = express();
const mongoose = require('./db/db')
const userRouter = require('./route/user')
const bodyParser = require('body-parser')
require('dotenv').config()
app.use(express.static('public'));
const cors = require('cors')
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors())
app.use(bodyParser.json());
app.use('/', userRouter)
app.listen(Port, () => {
    console.log(Port, 'port runing')
})