const express = require("express");
const {usersign_up,user_login}=require("../controllers/user.js")
const router=express.Router();
router.post("/",usersign_up)
router.post("/login",user_login)
module.exports=router;