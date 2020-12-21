const express = require('express');
const router = express.Router()

var admin = require("firebase-admin");
const db = admin.firestore();

const checkAdmin = (req,res, next) => {
    //console.log(req.body)
    const {idToken} = req.body
    admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      //const uid = decodedToken.uid;
      if(decodedToken.admin == true){
        console.log("ADMIN LOGGED IN")
        next()
      }
      else{
        res.redirect('/home')
      }
    })
    .catch((error) => {
      console.log(error.message)
    });
}

const checkSuperAdmin = (req,res, next) => {
  //console.log(req.body)
  const {idToken} = req.body
  admin.auth().verifyIdToken(idToken)
  .then((decodedToken) => {
    //const uid = decodedToken.uid;
    if(decodedToken.superAdmin == true){
      console.log("ADMIN LOGGED IN")
      next()
    }
    else{
      res.redirect('/home')
    }
  })
  .catch((error) => {
    console.log(error.message)
  });
}


router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/create",checkAdmin,(req, res) => {
    //console.log(req.body)
    const {username, email, mobile, bio, password} = req.body;
    admin.auth()
    .createUser({
      email: email,
      emailVerified: false,
      phoneNumber: mobile,
      password: password,
      displayName: username,
      disabled: false,
    })
    .then((user) => {
        console.log("ADMIN CREATED!!")
        db.collection("Admins").doc(user.uid).set({
        name : username,
        bio : bio,
        email : email,
        mobile : mobile
    }).then(() => 
    {
        console.log("DATA WRITTEN")  
        admin.auth().getUserByEmail(email).then((user) => 
        {
            admin.auth().setCustomUserClaims(user.uid, {
                admin: true
            }).then(()=>
            {
                console.log("MADE ADMIN!!!")
            })
        })
    }).catch((err) => {
      console.log(err.message)
    })
    
    })
    res.redirect("/login");
})


module.exports = router;