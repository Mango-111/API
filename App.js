const express=require('express');
const port=8888;
const app=express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
const connectDB=require('./config/db')
const postRoutes=require('./routes/postRoutes');
app.use('/api/',postRoutes);
connectDB()
app.listen(port,(err)=>{
    if (err) throw err;
    console.log(`working on ${port}`);
})