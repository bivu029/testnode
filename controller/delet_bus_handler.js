const BusModel= require('../model/model.js');

const deleteHandler=async(req,res)=>{

    const result = await BusModel.find({_id:req.params.id});
    const isbusExist= ()=>{
        const isresultNull= result.length==0?false:true
        return isresultNull; 
       }

      if(isbusExist){
        const deletebus= await BusModel.deleteOne({_id:req.params.id});
        res.send(deletebus);
      }else{
        res.send("no such bus exist");
      }

}

module.exports= deleteHandler;