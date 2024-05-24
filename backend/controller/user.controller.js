const asyncHandler = require("express-async-handler")
const User = require("../models/user.model")
const bcrypt = require('bcryptjs');
const generateToken = require("../config/generateToken")

const registerUser = asyncHandler(async(req, res)=>{
    const{name, email, password, pic} = req.body
    
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please enter all fields.")
    }
    const userExist = await User.findOne({ email})
    if(userExist){
        res.status(400)
        throw new Error("User already exists.")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = await User.create({
        name, 
        email, 
        password: hashedPassword, 
        pic
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Failed to create user.")
    }
})

const authUser  = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    console.log("🚀 ~ authUser ~ user:", user)
    console.log("await bcrypt.compare(user.password, password))", await bcrypt.compare(user.password, password));
    if (user && (await bcrypt.compare(user.password, password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    }else{
        res.status(400)
        throw new Error("Invalid user/password.")
    }
})

const allUser= asyncHandler(async(req, res)=>{
    const keyword = req.query.search?
    {
        $or: [
            {name:{ $regex: req.query.search, $options: "i" }},
            {email:{ $regex: req.query.search, $options: "i" }}
        ]
    }: {}
    
    const users= await User.find(keyword).find({_id: {$ne: req.user._id}})
    res.send(users)
})
module.exports = { registerUser, authUser, allUser }