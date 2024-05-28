import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture :{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZs48QUix604ageqmCzmG2EnTRtTaaNiL75YHC36W2iw&s",
    },
    },
    {timestamps: true}  //Mongoose automatically adds 'createdAt' and 'updatedAt' fields to the schema
    
);

    const User = mongoose.model('User',userSchema);  //It allows us to interact with the users collection in the database.

    export default User;