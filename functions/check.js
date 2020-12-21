

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

