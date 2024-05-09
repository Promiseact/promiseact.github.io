// Initialize Firebase
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

// Initialize Firebase app
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);}

const database = firebase.database();

// Initialize Firebase Authentication
const auth = firebase.auth();



  
document.addEventListener('DOMContentLoaded', function() {
    // Check if a user is logged in
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            console.log('User is authenticated:', user.uid);

            // Retrieve user data from the database
            const userRef = firebase.database().ref('users/' + user.uid);
            userRef.once('value')
                .then(function(snapshot) {
                    // Extract user's full name
                    const fullName = snapshot.val().full_name;

                    // Display user's name on the dashboard
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
            // No user is signed in, redirect to login page
            window.location.href = 'login.html';
            console.log('User is not authenticated');
        }
    });
});
  
