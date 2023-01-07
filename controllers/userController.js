const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const validateEmail = require('../helpers/validateEmail');
const createToken = require ('../helpers/createToken');


//Register
const userController = {
    register: async (req,res) => {
        try {
            //get info
            const {name, email, password} = req.body

            //check fields
            if(!name || !email || !password) return res.status(400).json({msg:"Please fill in all fields."})

            //check email
            if(!validateEmail(email)) return res.status(400).json({msg:"Please enter a valid Email-Address."})

            //check user
            const user = await User.findOne({email})
            if(user) return res.status(400).json(({msg:"This email is alreadr registered in our system."}))

            //check password
            if(password.length < 6) return res.status(400).json({msg:"Password must be at least6 characters."})

            //hash password
            const salt = await bcrypt.getSalt()
            const hashPassword = await bcrypt.hash(password,salt)

            //create token
            const newUser = {name, email, password:hashPassword}
            const activation_token = createToken.activation(newUser)


            //send email

            //Registeration success
        } catch (err) {
            res.status(500).json({msg:err.message})
        }
    }
};

module.exports = userController;
