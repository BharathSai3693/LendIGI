
const loginLink = document.querySelector("#loginLink")
// const logoutLink = document.querySelector("#logoutLink")
// const registerLink = document.querySelector("#registerLink")
const loginPage = document.querySelector("#profile")
const homePage = document.querySelector("#homepage")


//ON AUTH STATE CHANGE
auth.onAuthStateChanged((user) => {
    if(user){
        firebase.auth().currentUser.getIdToken(true).then((idToken) => {
            var idTokenClass = document.querySelectorAll(".idToken")
            for (var i = 0; i < idTokenClass.length; i++) {
                idTokenClass[i].value = idToken;
            }
        }).catch(function(error) {
                console.log(err.message)
        });

        user.getIdTokenResult().then((idTokenResult) => {
            var admin = idTokenResult.claims.admin
            if(admin == true){
                window.location.href = "./home" 
            }   
            else{
                auth.signOut();
                window.location.href = "./login" 
            }
        }) 
    }
    else{
        console.log("USER LOGGED OUT")
    }
})


// SIGNIN EVENT.
const loginForm = document.querySelector('#signInForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['loginEmail'].value;
    const password = loginForm['loginPassword'].value;

    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        //console.log("cred",cred)
        document.querySelector("#closeSignIn").click()
        loginForm.reset()
    })
    .catch((err) => {
        console.log(err.message)
    })
})