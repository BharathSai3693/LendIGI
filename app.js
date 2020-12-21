//REQUIRES  
const path = require('path')
const express = require('express');
const app = express();
const methodOverride = require('method-override');

//FIREBASE
var admin = require("firebase-admin");
var serviceAccount = require("./docs/serviceAccount/lendigi-c87d7-firebase-adminsdk-vbph3-dfb91ff7ba.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lendigi-c87d7.firebaseio.com"
});
const db = admin.firestore();

//SETTINGS
app.set("views", path.join(__dirname,"views"))
app.set("view engine","ejs")

//MIDDLEWARES
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));
//app.use(express.json());



//HOMEPAGE
app.get("/home", (req, res) => {
  res.render('home')
})

//AUTH ROUTES
const authRoute = require('./routes/authRoute');
app.use('/',authRoute)

//ADMIN ROUTE
const adminRoute = require('./routes/adminRoutes');
app.use('/',adminRoute)

//USER ROUTE
const userRoute = require('./routes/userRoutes');
app.use('/',userRoute)

//LOAN ROUTE
const loanRoute = require('./routes/loanRoutes');
app.use('/',loanRoute)



//SEEDS
const Trail = async () => {
  const snapshot = await db.collection('Admins').get();
  snapshot.forEach((doc) => {
  console.log(doc.id, '=>', doc.data());
  });
}

const seeds = async () => {
  const data = {
    Name: '3th User name',
    Email : 'user4mail@gmail.com',
    Gender : 'M',
    Address : '4th User 4address,4 user 4city,4th user zipcode',
    Due : 5000,
    Balance : 0 
  };
  
  // Add a new document in collection "cities" with ID 'LA'
  const res = await db.collection('Users').doc().set(data);
}


//EXPORT
module.exports = app;