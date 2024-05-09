
const firebaseConfig = {
    apiKey: "AIzaSyC2lAQ-BwraiZ-wt9jANGyvlmhPhnL5aPQ",
    authDomain: "promise-data.firebaseapp.com",
    databaseURL: "https://promise-data-default-rtdb.firebaseio.com",
    projectId: "promise-data",
    storageBucket: "promise-data.appspot.com",
    messagingSenderId: "198381065391",
    appId: "1:198381065391:web:73854fec910e2937f5f05a",
    measurementId: "G-LWNBR81C28"
    };


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);}

const database = firebase.database();


const auth = firebase.auth();



  
document.addEventListener('DOMContentLoaded', function() {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

            console.log('User is authenticated:', user.uid);

            const userRef = firebase.database().ref('users/' + user.uid);
            userRef.once('value')
                .then(function(snapshot) {
                 
                    const fullName = snapshot.val().full_name;

                    
                    const userNameElement = document.getElementById('user_name');
                    if (userNameElement) {
                        userNameElement.textContent = fullName;
                    } else {
                        console.error('Element with ID "user_name" not found.');
                    }
                })
                .catch(function(error) {
                    console.error('Error fetching user data:', error);
                });
        } else {
            
            window.location.href = 'login.html';
            console.log('User is not authenticated');
        }
    });
});
  
