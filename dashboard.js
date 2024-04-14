// Check if a user is logged in
// Initialize Firebase
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
  firebase.initializeAuth(firebaseConfig);
  firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

  
  // Check if a user is logged in
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in
        var userNameElement = document.getElementById('user_name');
        userNameElement.textContent = user.displayName || ''; // Set user's display name or fallback to an empty string
    } else {
        // No user is signed in, redirect to login page
        window.location.href = 'login.html';
    }
});
  
  // Function to fetch patient reports from the database
  function getPatientReports(patientId) {
      var reportsRef = firebase.database().ref('patient_reports').child(patientId);
      
      reportsRef.once('value', function(snapshot) {
          // Clear previous reports
          document.getElementById('report_container').innerHTML = '';
          
          // Iterate through each report
          snapshot.forEach(function(childSnapshot) {
              var reportData = childSnapshot.val();
              // Display each report
              displayReport(reportData);
          });
      });
  }

// Function to display a report
function displayReport(reportData) {
    // Create elements to display report
    var reportDiv = document.createElement('div');
    reportDiv.classList.add('report');

    var reportTitle = document.createElement('h2');
    reportTitle.textContent = reportData.title;

    // Create an <iframe> element to embed the PDF
    var pdfContainer = document.createElement('div');
    pdfContainer.classList.add('pdf-container');
    var pdfEmbed = document.createElement('iframe');
    pdfEmbed.src = reportData.pdfUrl;
    pdfEmbed.width = "100%";
    pdfEmbed.height = "100%";
    pdfContainer.appendChild(pdfEmbed);

    // Append elements to container
    reportDiv.appendChild(reportTitle);
    reportDiv.appendChild(pdfContainer);

    document.getElementById('report_container').appendChild(reportDiv);
}
