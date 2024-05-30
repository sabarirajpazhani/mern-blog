import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs';

export const test =(req,res)=>{
    res.json({message:"API is Working!"})
}

export const updateUser=async(req,res,next)=>{  //this function is only for the authenticated user only because the authenticated user only update there profile
    if(req.user.id !=req.params.userId){   //'id' that can be come from the "user.route.js" line 7 '/update/:userId' if the user id and cookie user id is not same it return error 
        return next(errorHandler(403,'You are not allowed to upadte this user'));
    }
    if (req.body.password){  //if the password contains lessthan 6 character this ill return the error
        if(req.body.password.length <6){
            return next(errorHandler(400,'Password must be at least 6 Characters'));
        }
        req.body.password=bcryptjs.hashSync(req.body.password,10);  //encrypt the password using hash
    }
    if(req.body.username){   //username error  between 7 to 20 characters
        if(req.body.username.length <7 || req.body.username.length>20){
            return next(errorHandler(400,'Username mus be between 7 and 20 Characters'));
        }
    }
    if(req.body.username.includes(' ')){ //username cannot contains spaces
        return next(errorHandler(400,'Username cannot contains spaces'));
    }
    if(req.body.username !== req.body.username.toLowerCase()){ //for username in lowercase
        return next(errorHandler(400,'Username must be lowercase'))
    }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
        return next(errorHandler(400,'Username can only contains letters and number'));
    }
    try{
        const updatedUser =await User.findByIdAndUpdate(req.params.userId,{
//      to prevent the user that sent the extra information
            $set:{  //used to update the everything from the request
                username:req.body.username,
                email:req.body.email,
                profilePicture:req.body.profilePicture,
                password:req.body.password,
            },
        },{new:true});
        const {password, ...rest}=updatedUser._doc;
        res.status(200).json(rest);
    } catch(error){
        next(error);
    }

};