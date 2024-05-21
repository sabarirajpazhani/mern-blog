import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
dotenv.config();
mongoose.connect(process.env.MONGO)  //for mongoose database
.then(
    ()=>{console.log('MongoDB is Connected')

    }).catch((err)=>{   
        console.log(err);
    });
const app=express();                                 
app.listen(3000,()=>{
    console.log('Server is running on Port 3000!');
});

app.use('/api/user',userRoutes);   //checking api
