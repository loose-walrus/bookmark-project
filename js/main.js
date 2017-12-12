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
  //if there are no bookmarks
  if(displayBookmarks === null || displayBookmarks == null){
    console.log("display bookmarks is null");
    document.getElementById("bookmarkResults").innerHTML = "Your bookmarks will display here...";
    return;
  } else {
    //get all the current bookmarks and store in a local variable
    var displayBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // // build the bookmarks in the results div
    var resultsDiv = document.getElementById("bookmarkResults");
    resultsDiv.innerHTML = '';

    // loop through displayBookmarks array
    // and build them into resultsDiv
    for(var i=0;i<displayBookmarks.length;i++){
      // store name and url for each iteration
      var siteName = displayBookmarks[i].name;
      var siteUrl = displayBookmarks[i].url;
      //build a div block through each iteration
      resultsDiv.innerHTML += '<div class="well">' +
                              '<h3>' +siteName+
                              ' <a class="btn btn-default" target="_blank" href="'+siteUrl+'">Visit</a> ' +
                              ' <a onclick="deleteBookmark(\''+url+'\')"class="btn btn-danger" target="_blank" href="#">Delete</a> '
                              '</h3>' +
                              '</div>';
     }
  }
}


// function deleteBookmark(){
//   // this function will delete a bookmark from local storage
//   // when the delete button is clicked.
// }
