const express= require('express');
const getBusHandler=require('../controller/get_bus_handler.js')
const postHandler=require('../controller/post_controller.js')
const updateBusHandler= require('../controller/update_bus_handler.js')
const deleteHandler=require('../controller/delet_bus_handler.js')
//const getUserHandler=require()
//const BusModel= require('../model/model.js')
const routeMongo= express.Router();

routeMongo.get('/',getBusHandler);
routeMongo.post('/',postHandler);
routeMongo.put('/:busname',updateBusHandler);
routeMongo.delete('/:id',deleteHandler);
// route.get('/user/:user_id',getUserHandler);
routeMongo.get('/con', async(req, res) =>{
    const connection= require('../config/config.js');
    res.send(await connection());
 });
 module.exports = routeMongo;