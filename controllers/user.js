const {v4:uuidv4}=require('uuid')
const User=require("../models/user")
const {setUser}=require("../services/auth");
async function usersign_up(req,res){
    const{name,email,password}=req.body;
    await User.create({
        name,
        email,
        password
    })
    res.render("home");
}
async function user_login(req,res){
    const{email,password}=req.body;
    const user=await User.findOne({email,password})
    if(!user){
        return res.render('login')
    }
    const sessionId=uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);

    res.render("home");
}
module.exports={usersign_up,user_login}