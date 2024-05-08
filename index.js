// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC2lAQ-BwraiZ-wt9jANGyvlmhPhnL5aPQ",
authDomain: "promise-data.firebaseapp.com",
databaseURL: "https://promise-data-default-rtdb.firebaseio.com",
projectId: "promise-data",
storageBucket: "promise-data.appspot.com",
messagingSenderId: "198381065391",
appId: "1:198381065391:web:73854fec910e2937f5f05a",
measurementId: "G-LWNBR81C28"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function patregister () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value


  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password does not follow proper format!')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false) {
    alert('Name is missing!')
    return
  }

 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created, you can now login!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is incorrect!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    window.location.href = "./dashboard.html"; // Change to the URL of your dashboard page

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var formContainer = document.getElementById('form_container');

  // Function to redirect to another page
  function redirectToAnotherPage() {
      window.location.href = './login'; // Change 'another_page.html' to the desired destination
  }

  // Event listener to detect clicks outside the form container
  document.addEventListener('click', function(event) {
      var isClickInsideForm = formContainer.contains(event.target);
      if (!isClickInsideForm) {
          redirectToAnotherPage();
      }
  });
});