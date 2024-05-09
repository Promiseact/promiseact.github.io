
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

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()


function patregister () {

  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value



  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password does not follow proper format!')
    return

  }
  if (validate_field(full_name) == false) {
    alert('Name is missing!')
    return
  }

 

  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {

    var user = auth.currentUser


    var database_ref = database.ref()


    var user_data = {
      email : email,
      full_name : full_name,
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).set(user_data)

  
    alert('User Created, you can now login!!')
  })
  .catch(function(error) {

    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}


function login () {

  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is incorrect!')
    return

  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {

    var user = auth.currentUser


    var database_ref = database.ref()

   
    var user_data = {
      last_login : Date.now()
    }


    database_ref.child('users/' + user.uid).update(user_data)

 
    window.location.href = "./dashboard"; 

  })
  .catch(function(error) {
    
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}





function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {

    return true
  } else {

    return false
  }
}

function validate_password(password) {

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

  
  function redirectToAnotherPage() {
      window.location.href = './login.html'; 
  }

  
  document.addEventListener('click', function(event) {
      var isClickInsideForm = formContainer.contains(event.target);
      if (!isClickInsideForm) {
          redirectToAnotherPage();
      }
  });
});