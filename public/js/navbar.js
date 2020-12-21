// //SIGNUP EVENT
const signUpForm = document.querySelector('#signUpForm')
signUpForm.addEventListener('submit',(e) => {
    e.preventDefault();

    const email = signUpForm['signUpEmail'].value;
    const password = signUpForm['signUpPassword'].value;
    const name = signUpForm['signUpUsername'].value;
    const mobile = signUpForm['signUpMobile'].value;
    const bio = signUpForm['signUpBio'].value;
    var user = firebase.auth().currentUser
    console.log(user)
    user.getIdTokenResult().then((idTokenResult) => {
        //console.log("##########")
        //console.log(idTokenResult)
        //console.log("##########")
        const token = idTokenResult.token;
        $.post("/create",{
            username : name,
            mobile : mobile,
            email : email,
            bio : bio,
            password : password,
            idToken : token,
        });
        document.querySelector("#closeSignUp").click()
        signUpForm.reset()
    })
})


//LOGOUT EVENT
const logout = document.querySelector("#logoutBtn");
logout.addEventListener('click', (e) => {
e.preventDefault();
auth.signOut();
})

//HOME LENDIGI
const logo = document.querySelector("#homeLink");
logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "/home"
})



//ADMINS LIST
const adminsList = document.querySelector("#adminsBtn");
adminsList.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("ASDFGHJKL")
    window.location.href = "/adminsList"
})



//USERS LIST
const usersList = document.querySelector("#usersBtn");
usersList.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "/users"
})


//LOANS LIST
const loansList = document.querySelector("#loansBtn");
loansList.addEventListener('click',(e) => {
    e.preventDefault();
    window.location.href = '/loans'
})