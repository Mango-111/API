const mongoose=require('mongoose')
const EmpSchema=new mongoose.Schema({
    empName:{
        type:String,
        required:true
    },
    empId:{
        type:String,
        required:true
    },
    empSalaray:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("Employee",EmpSchema);