 //add an event listener to the submit button of myForm
 document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Function to get the values of form input and store the
// bookmark in local storage as an object array
 function saveBookmark(e){
   //define form input variables
   var siteName = document.getElementById('siteName').value;
   var siteUrl = document.getElementById('url').value;

   if(!formValidation(siteName, siteUrl)){
      return false;
   }

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

      //reset the form fields upon each submit. 
      document.getElementById('myForm').reset();

    // display all bookmarks below submit button. Function defined below.
    fetchBookmarks();
   // Prevent form from submitting
   e.preventDefault();

 }


// Function to fetch all the bookmarks from local Storage
// and display them to the user
function fetchBookmarks(){
  //get all the current bookmarks and store in a local variable
  var displayBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //check if there are no bookmarks
  if(displayBookmarks === null || displayBookmarks.length == 0){
    console.log("display bookmarks is null");
    document.getElementById("bookmarkResults").innerHTML = "Your bookmarks will display here...";
    return;
  } else {
    console.log("display bookmarks var is NOT null!");
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
                              ' <a onclick="deleteBookmark(\''+siteUrl+'\')" class="btn btn-danger" href="#">Delete</a> '
                              '</h3>' +
                              '</div>';
     }
  }
}

// function to delete the bookmark from local Storage
// will run when the delete button is clicked
function deleteBookmark(url){
  //get all the bookmarks in local Storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //loop through all the bookmarks
  for(var i=0;i<bookmarks.length;i++){
    if(bookmarks[i].url == url){
      //remove from bookmarks
      bookmarks.splice(i, 1);
    }
  }
  //reset local Storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //refetch bookmarks so that the displayed list is updated
  fetchBookmarks();
}

//functiion for validating the form fields
function formValidation(siteName, siteUrl){
  //form validation if empty
  if(siteName == '' || siteUrl == ''){
    alert('Please fill in the form before clicking submit');
    return false;
  }
  //form validation regexp
  var expression = /https:[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
     alert('Please use the valid url https://www.example.com');
     return false;
  }
  return true;
}
