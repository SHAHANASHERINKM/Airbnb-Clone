const express = require('express');
const app=express();
const dotenv=require('dotenv');
const routes=require('./routes/index')
const connectDB=require('./config/db');
const cors=require("cors");

dotenv.config();
const port=process.env.PORT  || 5000;

app.use(cors({
    origin:["http://localhost:3000","https://nestaway-property-booking.onrender.com"]  
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api',routes);
connectDB();
require("./cron/expiredBookings");
require("./cron/completedBookings");

app.listen(port,()=>{
    console.log(`server connected at port ${port}`);
})