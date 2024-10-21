import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    firstName:{
        type: String,
        require:[true,"Please enter a first name"]
    },
    lastName:{
        type: String,
        require:[true,"Please enter a first name"]
    },
    email:{
        type:String,
        require:[true,"Please enter a valid email"],
        unique: true
    },
    password:{
        type: String,
        require:[true,"Please enter a password"],
 
    }

})

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;