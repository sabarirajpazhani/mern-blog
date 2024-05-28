import User from "../models/user.model.js";
import  bcryptjs from  'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup =async(req,res,next)=>{ //next for next API
    const {username,email, password}=req.body;

    if(!username || !email || !password || username==='' || email==='' || password===''){  //errorhandling
        next(errorHandler(400,'All fields are required'));
    }

    const hashPassword = bcryptjs.hashSync(password,10);

    const newUser= new User({
        username,
        email,
        password:hashPassword,     
    });

    try{
        await newUser.save();
        res.json('Signup Succussful');
    }
    catch(error){
        next(error);
    }
};

  
export const signin=async(req,res,next)=>{
    const{email,password}=req.body;//get email and password to the user
    if(!email|| !password ||email==='' ||password===''){
        next(errorHandler(400,'All fields are required'));
    }
    try{
        const validUser=await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,"User not found"));
        }
        const validPassword=bcryptjs.compareSync(password,validUser.password); //hash the password
        if(!validPassword){
            return next(errorHandler(400,"Invalid Password"));
        }

        //authenticate the user
        const token=jwt.sign({id: validUser._id}, process.env.JWT_SECRET)  //secret key can generate and verify valid tokens

        const {password:pass, ...rest}=validUser._doc;

        res.status(200).cookie('access_token',token,{ 
            httpOnly:true}).json(rest);

    }catch(error){
        next(error);
    }
}   


export const google=async(req,res,next)=>{
    //check if the user can be exisit or not , if the usere exisit we want the signIn ,bt not exsist we want to creat the new user
    const {email, name, googlePhotoUrl}=req.body;
    try{
        const user=await User.findOne({email});
        if(user){  //if the user exisit
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password,...rest}=user._doc;
            res.status(200).cookie('access_token',token,{
                httpOnly:true, //to make more secure
            }).json(rest);
        }else{    //if the email connot exsist means we want to create new user 
            const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedPassword=bcryptjs.hashSync(generatedPassword,10);
            const newUser=new User({
                username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),  // Sabari Raj ==> sabariraj8592
                email,
                password: hashedPassword,
                profilePicture:googlePhotoUrl,
            });
            await newUser.save();
            //creating the token
            const token =jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const{password, ...rest} =newUser._doc;
            res
              .status(200)
              .cookie('access_token',token,{
                httpOnly:true,
              })
              .json(rest);

        }
    } catch(error){
        next(error);
    }
}