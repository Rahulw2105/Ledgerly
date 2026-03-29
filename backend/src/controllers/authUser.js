
const User = require('../models/User');
const {generateAccessToken,generateRefreshToken} = require("../utils/generateTokens")
const registerUser = async (req,res) => {

    try {
    const {name,email,password,businessName} = req.body;
    
    const existingUser = await User.findOne({email});

    if(existingUser) {
        return res.status(409).send({
            message:"Email already in use"
        })
    }
   
    const newUser = await User.create({
        name,email,password,businessName 
    })

   const accessToken = generateAccessToken(newUser);
   const refreshToken = generateRefreshToken(newUser);
   
   newUser.refreshToken = refreshToken;

   await newUser.save();

 res.cookie('refreshToken', refreshToken);

 res.status(201).send({
    accessToken,
    user:{
        name:newUser.name
    },
    message:"Registatered Suceesfully"
 })
} 

catch(err) {
    res.status(500).send({
        message:err.message
    })
}
}

const loginUser = async (req,res) => {

    try{
  const {email,password} = req.body;
  console.log("request body login :" ,req.body)
  const user = await User.findOne({email}).select("-refreshToken");

  if(!user) {
   return  res.status(401).send("Invalid Credentials");
  }
  const verifyPassword = await user.comparePassword(password);
  console.log(verifyPassword);

  if(!verifyPassword){
         return res.status(401).send("Invalid Credentials");

  }

  const accessToken = generateAccessToken(user);
  console.log(accessToken);

  const refreshToken = generateRefreshToken(user);
  console.log("Referesh Token " , refreshToken);
  req.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken);

  res.status(200).send("Login Successfull");
  console.log("User : fron login api :" , user);

    }
    catch(err) {
        res.status(401).send("Invalid Credential:" , err.message )
    }
}

const logoutUser = async (req,res) => {
    try{
        const token = req.cookies.refreshToken;
        console.log("Token reciecved from lofout api" , token);
        if(!token) {
            return res.status(400).send({
                message:"No Active session"
            })
        }

        await User.findOneAndUpdate(
    { refreshtoken: token },   
    { refreshtoken: null }     
);

        res.clearCookie('refreshToken');
        res.status(200).send({message:"LoggerOut Successfully"});
    }

    catch(err) {
       return  res.status(500).send(err.message);
    }
}
module.exports = {registerUser,loginUser,logoutUser}