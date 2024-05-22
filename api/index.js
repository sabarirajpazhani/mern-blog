import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'; //cheching api
import authRoutes from './routes/auth.route.js'; //signup api

dotenv.config();
mongoose.connect(process.env.MONGO)  //for mongoose database
.then(
    ()=>{console.log('MongoDB is Connected')

    }).catch((err)=>{   
        console.log(err);
    });
const app=express(); 
app.use(express.json());        //for signup (in the insomniya) for testing api--> It enables our application to handle JSON data sent in the request body. This is commonly used when building APIs              
app.listen(3000,()=>{
    console.log('Server is running on Port 3000!');
});

app.use('/api/user',userRoutes);   //checking api
app.use('/api/auth',authRoutes);   //signup api


    
