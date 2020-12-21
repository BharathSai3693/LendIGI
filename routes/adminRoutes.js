const express = require('express');
const router = express.Router()

var admin = require("firebase-admin");
const db = admin.firestore();



//ADMINS
router.get("/adminsList",async (req, res) => {
    const adminRef = db.collection('Admins')
    const snapshot = await adminRef.get()
    res.render("adminsList",{snapshot})
})
  
router.get("/admins/:id", async (req, res) => {
    const {id} = req.params;
    const adminRef = db.collection('Admins');
    const snapshot = await adminRef.where('id', '==', parseInt(id)).get()
    res.render("adminprofile",{snapshot})
})
  
router.delete("/admins/:uid",async (req, res) => {
    const {uid} = req.params;
    admin
    .auth()
    .deleteUser(uid)
    .then(() => {
      console.log('Successfully deleted user');
      db.collection('Admins').doc(uid).delete().then(() => {
        console.log("DOCS DELETED")
      }).then(() => {
        res.redirect("/adminsList")
      })
    })
    .catch((error) => {
      console.log('Error deleting user:', error);
    });
})
  
router.get("/admins/:id/reset",async (req, res) => {
    const {id} = req.params;
    const adminRef = db.collection('Admins');
    const snapshot = await adminRef.where('id', '==', parseInt(id)).get()
    res.render("adminReset",{snapshot})
})
  
router.put("/admins/:id/reset", async (req, res) => {
    const {id} = req.params;
    const {newPassword, cNewPassword} = req.body;
    const adminRef = db.collection('Admins');
    const snapshot = await adminRef.where('id', '==', parseInt(id)).get()
    const adminEmail = snapshot.docs[0].data().email;
    admin.auth().getUserByEmail(adminEmail)
    .then((userRecord) => {
      const UID = userRecord.uid
      console.log("FOUND UID")
      admin.auth().updateUser(UID, {
        password: newPassword
      })
      .then((userRecord) => {
        console.log("RESET DONE")
      })
    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });
    res.redirect(`/admins/${id}`)
})
  
  
router.get("/admins/:id/edit", async (req, res) => {
    const {id} = req.params;
    const adminRef = db.collection('Admins');
    const snapshot = await adminRef.where('id', '==', parseInt(id)).get()
    // snapshot.forEach((doc) => {
    //   console.log(doc.data())
    //   console.log(doc.id)
    // })
    res.render("adminEdit",{snapshot})
})
  
router.put("/admins/:id",async (req, res) => {
    const {id} = req.params;
    const { name, email, mobile, bio}= req.body;
    const data = {
      name : name,
      email : email,
      mobile: mobile,
      bio : bio
    }
    const adminRef = db.collection('Admins');
    const snapshot = await adminRef.where('id', '==', parseInt(id)).get()
    const docId = snapshot.docs[0].id;
    console.log(docId)
    //DOCID AND UID ARE SAME
    admin
    .auth()
    .updateUser(docId, {
      email: email,
      phoneNumber: mobile,
    })
    .then(async (userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      
      const docRef = db.collection('Admins').doc(docId);
      // Set the 'capital' field of the city
      const result = await docRef.update(data);
      res.redirect(`/admins/${id}`)
    })
    .catch((error) => {
      console.log('Error updating user:', error);
    });


    
  
    
  
    
})
  

module.exports = router;