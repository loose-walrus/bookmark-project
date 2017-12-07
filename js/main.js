 //add an event listener to the submit button of the myForm
 document.getElementById('myForm').addEventListener('submit', saveBookmark);

//function to get the values of form input
 function saveBookmark(e){
   //define form input variables
   var siteName = document.getElementById('siteName').value;
   var siteUrl = document.getElementById('url').value;

   //define bookmark object with input variables as parameters
   var bookmark = {
     name: siteName,
     url: siteUrl
   }

   // Store a string into local storage...


   e.preventDefault();
 }
