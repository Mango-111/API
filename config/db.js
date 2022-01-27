const db="mongodb://localhost:27017/API-Work";
const empModel=require('../db/empSchema')
const mongoose=require('mongoose')
async function connectDB (){
    try{
        await mongoose.connect(db,{useNewUrlParser:true});
        console.log("MongoDb connected");
    }
    catch(err){
        console.log(err.message);
    }
}
module.exports=connectDB;