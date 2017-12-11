 //add an event listener to the submit button of myForm
 document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Function to get the values of form input and store the
// bookmark in local storage as an object array
 function saveBookmark(e){
   //define form input variables
   var siteName = document.getElementById('siteName').value;
   var siteUrl = document.getElementById('url').value;

   //define bookmark object
   var newBookmark = {
     name: siteName,
     url: siteUrl
   }

   // Local Storage only stores strings.
   // Have to parse JSON object and store as strings
   // Test if bookmark is null, else add to the list
   if(localStorage.getItem('bookmarks') === null){
      // initialize bookmark array
      var bookmarksArray = [];
      bookmarksArray.push(newBookmark);
      // Parse bookmark object to a string and set to local storage with
      // key value of "bookmarks"
      localStorage.setItem('bookmarks', JSON.stringify(bookmarksArray));
    } else {
      // Get current bookmarks as a JSON from local storage
      // store all the values in a new array called currentBookmarks
       var currentBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      //add bookmark the new bookmark
      currentBookmarks.push(newBookmark);
      //reset to local storage
      localStorage.setItem('bookmarks', JSON.stringify(currentBookmarks));
      }
   // Prevent form from submitting
   e.preventDefault();
 }


// Function to fetch all the bookmarks from local Storage
// and display them to the user
function fetchBookmarks(){
  //get all the curretn bookmarks and store in a local variable
  var displayBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // build the bookmarks in the results div
  var resultsDiv = document.getElementById("bookmarkResults");
  resultsDiv.innerHTML = '';

  if(displayBookmarks === null) {
    resultsDiv.innerHTML = 'Bookmarks you type will be displayed here...';
  }

}
