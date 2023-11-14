const express= require('express');
const postHandler=require('../controller/sql/post_bus_handler');
const updateBusHandler= require('../controller/sql/update_bus_handler');
const getBusHandler= require('../controller/sql/get_bus_handler');
const deleteHandler= require('../controller/sql/delete_bus_handler');
const getUserHandler=require('../controller/sql/user/get_user');
const BusModel= require('../model/model.js')
const route= express.Router();



route.get('/',getBusHandler);
 route.post('/:user_id',postHandler);
 route.put('/:bus_id',updateBusHandler);
 route.delete('/:bus_id',deleteHandler);
 route.get('/user/:user_id',getUserHandler);
 route.get('/con', (req, res) =>{
    const connection= require('../config/config.js');
    res.send(connection());
 });
 route.get('/user', (req, res) => {

 
 });
 module.exports = route;