const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
require("dotenv").config();



//db

//mongoose connection
const uri = process.env.MONGO_URL;

mongoose.set('strictQuery', false);
mongoose.connect(uri,err => {
    if(err) throw err;
})
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Db connection successfully")
})


//MidleWare
app.use(express.json());
express.urlencoded({extended:true});
app.use(cookieParser());
app.use('/uploads',express.static("uploads"));

//routes
app.use(userRoutes);
app.use(uploadRoutes);


const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})