const BusModel= require('../model/model.js');

const postHandler=async(req,res)=>{

   try {
    const result = await BusModel.find({busName:req.body.busName});
    const isbusExist= ()=>{
        const isresultNull= result.length==0?true:false
        return isresultNull; 
       }
   if(isbusExist()){
    const busdata= new BusModel(req.body);
    const resultData= await busdata.save();
    res.status(201).send("bus created");
    
   }else{
    res.status(400).send("bus name alredy exist please update or delete and try agin");
   }
    
   } catch (error) {
    res.send(error);
    
   }

}
module.exports=postHandler;