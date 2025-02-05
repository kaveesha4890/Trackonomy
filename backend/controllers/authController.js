const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = async(req,res) =>{
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({msg: "All fields are required!"});
    }
    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:'User already exists'});
        }
        user = new User({name, email, password});
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
    
        await user.save();
        res.status(200).json({msg:'User registeration successfully'});
    }catch(err){
        console.log(err);
        res.status(500).send("Server error");
    }
};

exports.login = async(req,res) =>{
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: "Invalid credintials"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg: "Invalid password"});
        }
       
        const payload = {user: {id: user.id}};
        const token = jwt.sign(payload, process.env.JWT, {expiresIn: '3h'});
        res.status(200).json({
            token,
            msg:"User logging successfully",
            user: {name:user.name, email:user.email},
        });
    }catch(err){
        console.log(err);
        res.status(500).send("Server error");
    }
};

