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
                var html = '';
                console.log('User Logged in : ', user.uid )
        
                db.collection('Admins').doc(user.uid).get().then((doc) => {
                    var data = doc.data();
                    //console.log(data)
                    html = `<h4 id="adminName">${data.name}</h4>
                    <h4 id="adminEmail">${data.email}</h4>
                    <h4 id="adminMobile">${data.mobile}</h4>
                    <h4 id="adminBio">${data.bio}</h4>`
                    document.querySelector("#details").innerHTML = html;
                }).catch((err) => {
                    console.log(err.message)
                });
            }
            else{
                auth.signOut();
                window.location.href = "./login"
            }
        })
    }
    else{
        window.location.href = "./login"
        console.log("USER LOGGED OUT")
    }
})
