const express= require('express');
const connection= require('./config/config.js');
const route = require('./routes/routes.js');
require('dotenv').config();

//connection();
var port=process.env.PORT ;
var PORT=3001;
const app= express();
app.use(express.json());

app.use('/bus',route);
app.listen(port);