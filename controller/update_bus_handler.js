const BusModel= require('../model/model.js');

const updateBusHandler=async(req,res)=>{
    const result = await BusModel.find({busName:req.params.busname});
  
    
    const isbusExist= ()=>{
        const isresultNull= result.length==0?false:true;
        return isresultNull; 
       };

       if(isbusExist()){
       
        const myQuery= {busName:req.params.busname};
    


                const newvalues = { $set: {busName:req.body.busName==result[0].busName?result[0].busName:req.body.busName ,
                    busNumber:req.body.busNumber==result[0].busNumber?result[0].busNumber:req.body.busNumber,
                    status:req.body.status==result[0].status?result[0].status:req.body.status,
                    publicTransport:req.body.publicTransport==result[0].publicTransport?result[0].publicTransport:req.body.publicTransport,
                    startFrom:req.body.startFrom==result[0].startFrom?result[0].startFrom:req.body.startFrom,
                    allStation:req.body.allStation==result[0].allStation?result[0].allStation:req.body.allStation,
                    endStop:req.body.endStop==result[0].endStop?result[0].endStop:req.body.endStop,
                    startTime:req.body.startTime==result[0].startTime?result[0].startTime:req.body.startTime,
                    endTime:req.body.endTime==result[0].endTime?result[0].endTime:req.body.endTime,
                    runAllDays:req.body.runAllDays==result[0].runAllDays?result[0].runAllDays:req.body.runAllDays,
                    isRunningToday:req.body.isRunningToday==result[0].isRunningToday?result[0].isRunningToday:req.body.isRunningToday,
                    runningDays:req.body.runningDays==result[0].runningDays?result[0].runningDays:req.body.runningDays
                     
                                   },  
                              };
   
                const update= await BusModel.updateOne(myQuery,newvalues);
                if(update.modifiedCount==0){
                    res.send('No data change');
                  }else{
                   res.send(update);
                  }
      
     

      }else{
        res.send("no such bus exist");
      }

}
module.exports=updateBusHandler;