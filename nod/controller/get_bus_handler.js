const BusModel= require('../model/model.js');
const connection= require('../config/config.js')


const getBusHandler=async(req,res)=>{
    try {
     await connection();
    const getbus=await BusModel.find();
    
   res.status(200).send(getbus);
    } catch (error) {
        console.log(`error is ${error}`)
        res.status(404).send(error);
    }
}
module.exports=getBusHandler;