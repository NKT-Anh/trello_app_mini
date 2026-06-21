const express = require('express');
const router = express.Router();
const {addDoc,collection,getDocs,getDoc, updateDoc,doc,deleteDoc,exists} = require('firebase/firestore');
const { db } = require('../configs/firebase-config.js');
const jwt = require('jsonwebtoken');
const authController ={
    checkEmailExists: async (req, res) => {
        const { email } = req.body;
        try{
            const user  = await getDocs(collection(db, 'users'));
            const emailExists = user.docs.some(item => item.data().email === email);
            res.status(200).json({ emailExists });

        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
    },
    createNewUser: async (req, res) => {
        const { email, name } = req.body;
        try{
            const userObject = { email, name:name || "", createdAt: new Date().toISOString() };
            const user  = await getDocs(collection(db, 'users'));
            const userData = user.docs.find(item => item.data().email === email);
            if(userData){
                return res.status(400).json({ message: "Email đã tồn tại" });
            }
            const ref = await addDoc(collection(db, 'users'), userObject);
            console.log(ref.id);
            res.status(201).json({ id: ref.id, ...userObject });
        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
    },
    loginUser: async (req, res) => {
        const { email } = req.body;
        try{
            const user  = await getDocs(collection(db, 'users'));
            const userData = user.docs.find(item => item.data().email === email);
            if(!userData){
                return authController.createNewUser(req,res);
                
            }
            const token = jwt.sign({
                id: userData.id,
                email: userData.data().email,
                name: userData.data().name
            }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ user: { ...userData.data(), token } });
            
            
        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
    },
}

module.exports = authController;
