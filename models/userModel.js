const {Schema, model} = require ('mongoose');

const userSchema = new Schema(
    {
        name:{
            type:String,
            required:[true, "Please enter your Name"],
            trim:true
        },
        email:{
            type:String,
            required:[true, "Please enter your Email"],
            trim:true,
            unique : true
        },
        password:{
            type:String,
            required:[true, "Please enter your Password"],
            min:6
        },
        avatar:{
            type:String,
            default:'https://res.cloudinary.com/sanu-code/image/upload/v1673191294/avatar-auth/avatar-G_i8lsh8.png'
        }
    },{
        timestamps :true
    }
);

const User = model("User", userSchema);

module.exports = User;