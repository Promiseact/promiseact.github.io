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

  // initialize firebase
  firebase.initializeApp(firebaseConfig);
  
  // reference your database
 var promiseLoginDB = firebase.database().ref("promiseLogin");
 document.getElementById("patLogin").addEventListener("submit", submitForm);
 
 function submitForm(e) {
    e.preventDefault();
  
    var name = getElementVal("name");
    var emailid = getElementVal("emailid");
    var msgContent = getElementVal("msgContent");
  
    saveMessages(name, emailid, msgContent);
  
    //   enable alert
    document.querySelector(".alert").style.display = "block";
  
    //   remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);
  
    //   reset the form
    document.getElementById("contactForm").reset();
  }
  
  const saveMessages = (name, emailid, msgContent) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      name: name,
      emailid: emailid,
      msgContent: msgContent,
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };