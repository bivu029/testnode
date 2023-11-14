
const mongoose= require('mongoose');
require('dotenv').config();
const uRl= 'mongodb+srv://bivu029:vQDdY2gh7zqiHvBC@cluster0.mf2rafv.mongodb.net/busdata?retryWrites=true&w=majority';
const url='mongodb://bivu029:vQDdY2gh7zqiHvBC@ac-h6bnkva-shard-00-00.mf2rafv.mongodb.net:27017,ac-h6bnkva-shard-00-01.mf2rafv.mongodb.net:27017,ac-h6bnkva-shard-00-02.mf2rafv.mongodb.net:27017/busdata?ssl=true&replicaSet=atlas-wn8ysf-shard-0&authSource=admin&retryWrites=true&w=majority'
const url2='mongodb+srv://bivu029:iiOtV7KikaIHdDyz@cluster0.1urem6t.mongodb.net/busdata?retryWrites=true&w=majority'
const connection = async()=>await  mongoose.connect(url2,
    {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
       // dbName:'busdata',
      }
    ).then(() => console.log(' data base Connected!')).catch((err)=>{
      console.log('DATA BASE NOT CONNECTED');
        console.log(err);
    });
    
    module.exports= connection;

   