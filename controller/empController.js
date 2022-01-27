const empModel=require('../db/empSchema')

async function getData(){
    await empModel.find({},(err,data)=>{
        if(err) throw err;
        return data;
    })
}
async function postData(data){
    let ins =await new empModel(data);
    ins.save((err)=>{
        if (err) throw err;
    })
}
async function updateData(){
    await empModel.updateOne({empId:empId},{$set:{empId:data.empId,empName:data.empName}})
    if (err) throw err;
}
async function deleteData(empId){
    await empModel.deleteOne({empId:empId},(err)=>{
        if (err) throw err;
    })
}

module.exports={getData,postData,updateData,deleteData}