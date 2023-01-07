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
            default:''
        }
    },{
        timestamps :true
    }
);

const User = model("User", userSchema);

module.exports = User;