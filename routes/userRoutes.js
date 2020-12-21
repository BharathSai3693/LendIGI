const express = require('express');
const router = express.Router()

var admin = require("firebase-admin");
const db = admin.firestore();



//USERS
router.get("/users",async (req, res) => {
    const usersRef = db.collection('Users');
    const snapshot = await usersRef.get()
    // var array = []
    // await snapshot.forEach(doc => {
    //   array.push(doc.data())
    // })
    //console.log(array)
    res.render("users",{snapshot})
})
  
  
router.get("/users/:id",async (req,res) => {
    const {id} = req.params;
    const userRef = db.collection('Users');
    const snapshot = await userRef.where('id', '==', parseInt(id)).get();
    // if (snapshot.empty) {
    //   console.log('No matching documents.');
    //   return;
    // }  
    //console.log(snapshot)
    //console.log("yoyoyooyo")
    const loansRef = db.collection('Loans');
    const loansSnap  = await loansRef.where('user_id', '==', parseInt(id)).get();
    res.render('userProfile',{snapshot,loansSnap})
})
  

module.exports = router;