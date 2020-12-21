// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA3trA6N_0RkhAtlIwelV9LREurUqwgXBk",
    authDomain: "lendigi-c87d7.firebaseapp.com",
    databaseURL: "https://lendigi-c87d7.firebaseio.com",
    projectId: "lendigi-c87d7",
    storageBucket: "lendigi-c87d7.appspot.com",
    messagingSenderId: "1051312718264",
    appId: "1:1051312718264:web:acb612a8879fe315278f4d",
    measurementId: "G-P6YZXJDVJL"
};


firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    db.settings({ timeStampsInSnapShots : true});