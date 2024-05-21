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
    },},{timestamps: true}  //Mongoose automatically adds 'createdAt' and 'updatedAt' fields to the schema
);

    const User = mongoose.model('User',userSchema);  //It allows us to interact with the users collection in the database.

    export default User;