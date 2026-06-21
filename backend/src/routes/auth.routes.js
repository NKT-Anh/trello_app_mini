const express = require('express');
const router = express.Router();
const randomString = require('randomstring');
const otpStore = {};
const sendEmail = require('../services/sendEmail.js');
const authController = require('../controllers/auth.controller.js');
router.post('/signup', authController.createNewUser);
router.post('/check-email', authController.checkEmailExists);

router.post('/signin',(req,res)=>{
    const {email,otp} = req.body;
    const storeData = otpStore[email];
    if(!storeData){
        return res.status(400).json({message:'Invalid email or verification code"'});


    }
    if(Date.now() > storeData.expireAt){
        delete otpStore[email];
        return res.status(400).json({message:'OTP hết hạn'});
    }
    if(storeData.otp !== otp){
        return res.status(400).json({message:'OTP không đúng'});
    }
    delete  otpStore[email];

    return authController.loginUser(req,res);
});

router.post ('/send-otp',async(req,res)=>{
    try{
    const {email} = req.body;
    const otp = randomString.generate({length:6,charset:'numeric'});
    console.log("otp: " + otp);
    otpStore[email]= {
        otp,
        expireAt: Date.now() + 5*60*1000
    };
    await sendEmail(email,otp);
    res.status(200).json({message:'OTP đã được gửi'});
}catch(error){
    res.status(500).json({message:'Lỗi khi gửi OTP'});
}
});

module.exports = router;
