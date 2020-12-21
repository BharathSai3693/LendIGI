const express = require('express');
const router = express.Router()

var admin = require("firebase-admin");
const db = admin.firestore();



//LOANS
router.get("/loans",async (req, res) => {
    const snapshot = await db.collection('Loans').get();
    res.render("loans",{snapshot})
})

router.post("/loans/accept", async (req, res) => {
    const {idToken, loanUid} = req.body;
    db.collection('Loans').doc(loanUid).update({
        status : 1
    }).then(()=> {
        console.log("ACCEPTED")
        res.redirect("back")
    }).catch((err)=> {
        console.log(err.message)
    })
})

router.post("/loans/reject", async (req, res) => {
    const {idToken, loanUid} = req.body;
    db.collection('Loans').doc(loanUid).update({
        status : -1
    }).then(()=> {
        console.log("REJECTED")
        res.redirect("back")
    }).catch((err)=> {
        console.log(err.message)
    })
})


module.exports = router;