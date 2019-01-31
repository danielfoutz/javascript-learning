// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e){
	// Get form values. Adding .value returns the user input rather than
	// the element data. 
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if(!validateForm(siteName, siteUrl)){
		return false;
	}

	// Save both values together in array named 'bookmark'
	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	// If there is no stored bookmark, create array
	if(localStorage.getItem('bookmarks') === null){
		var bookmarks = [];
		// Add to array
		bookmarks.push(bookmark);
		// Set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// Get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Add bookmark to array
		bookmarks.push(bookmark);
		// Reset to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	// Clear form
	document.getElementById('myForm').reset();

	// Re-fetch bookmarks
	fetchBookmarks();

  // Prevent form submission
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
	// Get bookmark from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Loop through bookmarks
	for(var i=0;i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			// Remove from array
			bookmarks.splice(i, 1);
		}
	}
	// Reset to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	
	// Re-fetch bookmarks
	fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks(){
	// Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	
	// Get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	// Build output
	bookmarksResults.innerHTML = '';
	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += 
			'<div class="card bg-light text-dark card-body mt-2">' +
			'<h3 class="ml-2">' +name+
			'<div class="d-inline-block float-right">'+
			' <a class="btn btn-primary mr-2 px-4" target="_blank" href="'+url+'">Visit</a> ' +
			' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' + 
			'</div>'+
			'</h3>' +
			'</div>';
	}
}

// Validate form
function validateForm(siteName, siteUrl){
	// If a field is left blank, alert invalid
	if(!siteName || !siteUrl){
		alert('You need a site name and URL.');
		return false;
	}

	// This is a regular expression to help determine if a URL is valid or not
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	// And if it's not, we alert invalid
	if(!siteUrl.match(regex)){
		alert('Not a valid URL.');
		return false;
	}

	return true;
}

/*	LOCAL STORAGE FUNCTIONS
	Save to local storage
		localStorage.setItem('test', 'BEAR DOWN FOR MIDTERMS!');
	
	Detch from local storage
		localStorage.getItem('test');
	
	Delete from local storage
		localStorage.removeItem('test');
*/