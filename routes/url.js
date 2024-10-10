const express=require("express");
const {generatenew}=require("../controllers/url")
const router=express.Router();
router.post('/',generatenew);
module.exports=router;