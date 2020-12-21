auth.onAuthStateChanged((user) => {
    if(user){
    // window.location.href = "./home"
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
        
                console.log('User Logged in : ', user.uid )            
            }
            else{
                auth.signOut();
                window.location.href = "./login"
            }
        })
    }
    else{
        // auth.signOut();
        window.location.href = "./login"
        console.log("USER LOGGED OUT")
            
    }
})


