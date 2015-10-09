/*
 * Instagram Theatre
 * Version: 1.0
 *
 * Author: Chris Rivers
 * http://chrisriversdesign.com
 *
 *
 * Changelog: 
 * Version: 1.0
 *
 */

// Global
var ibObj;
var instagramBrowserNextMax;

/* Instagram Popular Fetch
------------------------------*/
function instagramFetch(settings){	
	var access_token = settings.accessToken;
    var param = {access_token:access_token};
    fetchCMD(param, settings);
}

function fetchCMD(param, settings){

	var cmdURL = "";
	
	if( settings.mode == 'user' ){
		// User Mode
		cmdURL = 'https://api.instagram.com/v1/users/' + settings.userID + '/media/recent/?callback=?';
		
	} else if( settings.mode == 'popular' ) { // No Load More For this Feature
		// Popular Mode
    	cmdURL = 'https://api.instagram.com/v1/media/popular?callback=?';

	} else if( settings.mode == 'location' ) { // No Load More For this Feature
		// Location Mode
    	cmdURL = 'https://api.instagram.com/v1/locations/' + settings.locationID + '/media/recent/?callback=?';

	} else if( settings.mode == 'multiuser' ){ // No Load More For this Feature
		// New - Multi User Mode
		var userIDArray = settings.userID;
		userIDArray = userIDArray.split(",");

		jQuery.each(userIDArray, function(index){			
			cmdURL = 'https://api.instagram.com/v1/users/' + userIDArray[index] + '/media/recent/?callback=?';

			jQuery.getJSON(cmdURL, param, function(data){
				onPhotoLoaded(data, settings, "off");
			});
		});

		return false;

	} else {
		// New - Tags Mode
		var tagQuery = settings.tag.replace(/ /g,'');
		cmdURL = 'https://api.instagram.com/v1/tags/' + tagQuery + '/media/recent?callback=?';
	}

   	jQuery.getJSON(cmdURL, param, function(data){
		onPhotoLoaded(data, settings);
	});
}

/* Instagram User Search
------------------------------*/
function instagramUserSearch(settings){
	var access_token = settings.accessToken;
	var searchQuery = settings.user;
	var param = {access_token:access_token,q:searchQuery};
		
    userSearchCMD(param, settings);
}

function userSearchCMD(param, settings){
	var cmdURL = 'https://api.instagram.com/v1/users/search?callback=?';
	
   	jQuery.getJSON(cmdURL, param, function(data){
		onUserLoaded(data, settings);
	});
}

function onUserLoaded(data, settings){
	if( data.meta.code == 200 ){
        var users = data.data;
		// console.log(data);
		
		if( users.length > 0 ){
            for( var key in users ){
				// Build UI
				var user = users[key];			
				var instagramUser = '';
							
				instagramUser = '<div class="instagram-user-all" id="p' + user.id + '" title="' + user.username + '" rel="' + user.id + '">';
				instagramUser += 	"<img src='" + user.profile_picture + "' />";
				instagramUser += 	"<span class='instagram-username'>" + user.username + "</span>";
				instagramUser += 	"<span class='instagram-fullname'>" + user.full_name + "</span>";
				instagramUser += '</div>';

	            jQuery(instagramUser).appendTo(ibObj);
				
			}
		}
		
	}
}

/* Instagram Tags Load More
---------------------------------*/
function instagramTagsLoadMore(settings){
	var access_token = settings.accessToken;
    var param = {access_token:access_token, max_tag_id: instagramBrowserNextMax};

	if( settings.mode == 'tag' ){
		var searchQuery = settings.tag.replace(/ /g,'');
	}

    loadMoreCMD(settings,param,searchQuery);
}

function loadMoreCMD(settings, param, searchQuery){

	var cmdURL = "https://api.instagram.com/v1/tags/" + searchQuery + "/media/recent?callback=?";

   	jQuery.getJSON(cmdURL, param, function(data){
		onPhotoLoaded(data, settings);
	});
}

/* Instagram Users Load More
---------------------------------*/
function instagramUsersLoadMore(settings){
	var access_token = settings.accessToken;
    var param = {access_token:access_token, max_id: instagramBrowserNextMax};

    loadMoreUsersCMD(settings,param);
}

function loadMoreUsersCMD(settings, param){

	var cmdURL = 'https://api.instagram.com/v1/users/' + settings.userID + '/media/recent/?callback=?';

   	jQuery.getJSON(cmdURL, param, function(data){
		onPhotoLoaded(data, settings);
	});
}

/* Instagram Location Load More
---------------------------------*/
function instagramLocationLoadMore(settings){
	var access_token = settings.accessToken;
    var param = {access_token:access_token, max_id: instagramBrowserNextMax};

    loadMoreLocationsCMD(settings,param);
}

function loadMoreLocationsCMD(settings, param){

	var cmdURL = 'https://api.instagram.com/v1/locations/' + settings.locationID + '/media/recent/?callback=?';
	
   	jQuery.getJSON(cmdURL, param, function(data){
		onPhotoLoaded(data, settings);
	});
}

/* Photo Handler
------------------------------*/
function onPhotoLoaded(data, settings, loadMoreBool){
	
	// If fullscreen mode and user has defined photos, dont pull from instagram...
	if( settings.galleryFullscreenPhotos != "" && settings.galleryMode == "fullscreen" ){
		displayGalleryByType(settings);
		return false;			
	}

	// Store Next Page of Results... // next_url
	if( data.pagination ){
		if( data.pagination.next_max_id ){
			instagramBrowserNextMax = data.pagination.next_max_id;
		} else {
			instagramBrowserNextMax = "Empty";
		}	
	} else {
		instagramBrowserNextMax = "Empty";
	}

    if( data.meta.code == 200 ){

		// Testing
		// console.log(data);

		// Setting Up Variables
        var photos = data.data;

		if( ibObj.html() != "" ){
			var addingToList = true;
		} else {
			var addingToList = false;
		}

        if( photos.length > 0 ){

			// console.log(photos);

            for( var key in photos ){

				// Get Photo Data
				var photo = photos[key];

				// Build DOM
				var instagramPhoto = '';				
				var photoCaption = '';

				// Fallback
				if( photo.caption ){
					photoCaption = photo.caption.text;
				} else {
					photoCaption = "Instagram Photo";
				}

				// Fallback
				if( photo.link == null ){
					photo.link = "http://instagram.com/p/"
				}
				
				instagramPhoto = '<a class="instagram-photo" href="' + photo.images.standard_resolution.url + '" data-url="' + photo.link + '" data-name="' + photo.user.full_name + '" id="p' + photo.id + '" title="' + photoCaption + ' (' + photo.likes.count + ' Likes) &lt;a href=&quot;'+photo.link+'&quot;&gt;View Photo&lt;/a&gt; " data-created="' + photo.created_time + '" rel="group">';
				instagramPhoto +=    '<img src="' + photo.images.standard_resolution.url + '" width="100%">';
				instagramPhoto += '</a>';

	            jQuery(instagramPhoto).appendTo(ibObj);
            }

			// Count photos
			var photoCount = jQuery('.instagram-photo').size() - 1;

			if( addingToList == false ){
				jQuery('.instagram-photo').hide();
			}

			jQuery('.instagram-photo').each(function(index){

				// Store Current Photo
				currentPhoto = jQuery(this);

				// Render Effect
				currentPhoto.delay( settings.delayInterval * index ).fadeIn(settings.speed);

				// Clear Any Existing Load More Buttons
				jQuery("#seachInstagramLoadMoreContainer").remove();

				// Load More Logic
				if( index == photoCount && instagramBrowserNextMax != "Empty" ){
					// Load More Button
					jQuery('<div id="seachInstagramLoadMoreContainer"><a class="seachInstagramLoadMore btn btn-inverse">Load More</a></div>').appendTo(ibObj);
				}

				if( loadMoreBool == "off" ){
					// Clear Any Existing Load More Buttons
					jQuery("#seachInstagramLoadMoreContainer").remove();
				}

			});
			
			displayGalleryByType(settings);
			
        } else {
            alert('empty');
        }

    } else {
        alert(data.meta.error_message);
    }
}

function displayGalleryByType(settings){
	
	/*  
   	Gallery Mode - Fullscreen
	------------------------------*/
	if( settings.galleryMode == "fullscreen" ){
		
		/* Data Setup
		------------------------*/
		// Create Photos Variable
		var images = [];
		if( settings.galleryFullscreenPhotos != "" ){
			jQuery(settings.galleryFullscreenPhotos + " img").each(function(index){				
				var imageObj = {
					'path' : jQuery(this).attr("src"),
					'title' : jQuery(this).attr("title"),
					'dateTime' : jQuery(this).attr("date-created"),
					'caption' : jQuery(this).attr("rel")
				}

				images[index] = imageObj;
			});

		} else {

			jQuery(".instagram-photo").each(function(index){				
				var imageObj = {
					'path' : jQuery(this).find("img").attr("src"),
					'title' : jQuery(this).attr("data-name"),
					'dateTime' : jQuery(this).attr("data-created"),
					'caption' : jQuery(this).attr("title")
				}

				images[index] = imageObj;
			});
			
			ibObj.hide();

		}
						
	    // A little script for preloading all of the images
	    // It's not necessary, but generally a good idea
	    // jQuery(images).each(function(){
	       // jQuery('<img/>')[0].src = this; 
	    // });

	    // The index variable will keep track of which image is currently showing
	    var index = 0;

	    // Call backstretch for the first time,
	    // In this case, I'm settings speed of 500ms for a fadeIn effect between images.
	    jQuery.backstretch(images[index].path, {speed: 500});

	    // Set an interval that increments the index and sets the new image
		function cycle(){
	        index = (index >= images.length - 1) ? 0 : index + 1;
	        if( images[index] ){
				jQuery.backstretch(images[index].path);
				updateCaption(index);
			} else {
				index = index - 1;
			}
	    }

		function updateCaption(index){
			
			if( settings.galleryFullscreenPhotos != "" ){
				var obDate = images[index].dateTime;
			} else {
				// Date Conversion
				var obDate = parseInt(images[index].dateTime);
				obDate = new Date( obDate * 1000 );
				obDate = dateFormat(obDate, "dddd, mmmm dS, yyyy, h:MM:ss TT");
			}
		
			// Build Content Box
			var captionContent = "<h3>" + images[index].title + "</h3>";
			captionContent += "<em>" + obDate + "</em>";
			captionContent += "<p>" + images[index].caption + "</p>";

			jQuery(".caption-container .content").html(captionContent);
		}

	    var interval = setInterval(cycle, 5000);

		// Events
		jQuery(".photo-nav a.next").click(function(){					
			index = (index >= images.length - 1) ? 0 : index + 1;
								
			if( images[index] ){
				jQuery.backstretch(images[index].path);
				updateCaption(index);

				// Reset Timer
				clearInterval(interval);
				interval = setInterval(cycle, 7000);
			} else {
				index = index - 1;
			}
		});

		jQuery(".photo-nav a.prev").click(function(){
			index = (index >= 1) ? index - 1 : images.length - 1;
        
			if( images[index] ){
				jQuery.backstretch(images[index].path);
				updateCaption(index);

				// Reset Timer
				clearInterval(interval);
				interval = setInterval(cycle, 7000);
			} else {
				index = index + 1;
			}
		
		});
		
		// Update Caption On Load
		updateCaption(index);
	}
	
	/*  
   	Gallery Mode - Thumbnail
	------------------------------*/
	if( settings.galleryMode == "thumbnail" ){
		// Clean Interface
		jQuery(".caption-container").hide();
		jQuery(".photo-nav").hide();
		
		jQuery(ibObj).show();
		startFancybox();
	}
	
	/*  
   	Gallery Mode - List
	------------------------------*/
	if( settings.galleryMode == "list" ){
		// Clean Interface
		jQuery(".caption-container").hide();
		jQuery(".photo-nav").hide();
						
		jQuery(ibObj).show().addClass("list");
		startFancybox();
	}
}

function startFancybox(){
	jQuery(ibObj).find("a.instagram-photo").fancybox({
		'nextEffect'	:	'fade',
		'prevEffect'	:	'fade',
		'overlayOpacity' :  0.8,
		'overlayColor' : '#000000',
		'arrows' : false,
		'titlePosition' : 'inside'
	});
}

jQuery.fn.instagramTheatre = function ( options ) {
	
	/* Setting Up Variables
	------------------------------*/
	var settings = {
		mode : 'popular', // This sets the mode to either "user","popular","tag","multiuser","location". Default is set to popular
		accessToken : '3794301.f59def8.e08bcd8b10614074882b2d1b787e2b6f', // This a mandatory setting that allows you to specify a user token. Default is 3794301.f59def8.e08bcd8b10614074882b2d1b787e2b6f
		userID : '1138644', // This is a setting that you have to use if your using "user" mode. Default is "For stunning photography – Kevin Burg".
		speed: 700, // Sets the speed of the images fade in effect, default is 700.
		delayInterval : 80, // Sets the interval of the delay between photos appearing, default is 80.
		tag: 'sports', // Sets the tag used to pull photos from
		locationID: '41354', // Sets the id of a location you would like to pull photos from, default is M&T BANK STADIUM, Baltimore.
		galleryMode: 'thumbnail', // list, thumbnail, fullscreen
		galleryFullscreenPhotos: ''
	};
	
	ibObj = jQuery(this);
	
	// Combine your options with our settings...
	jQuery.extend(settings, options);
	
	/* Plugin Logic
	------------------------------*/
	return this.each(function() {

		// Powers Activate...
		jQuery(document).ready(function(){
			
			instagramFetch(settings);
			
			// Events
			jQuery(document).on("click", ".seachInstagramLoadMore", function(){
				if( settings.mode == 'tag' ){
					instagramTagsLoadMore(settings);
					
				} else if( settings.mode == 'user' ){					
					instagramUsersLoadMore(settings);
					
				} else if( settings.mode == 'location' ){					
			    	instagramLocationLoadMore(settings);
				}
			});
			
			jQuery("#searchByTag .submit").click(function(){
				// Clear UI & Search
				ibObj.html("");
				
				var customSettings = settings;
				customSettings.mode = 'tag';
				customSettings.tag = jQuery("input.searchTag").val().replace(/ /g,'');
				
				if( customSettings.tag == "" ){
					alert("Please enter a valid hashtag.");
					return false;
				}
				
				instagramFetch(customSettings);
				return false;
			});
			
			jQuery("#searchByUser .submit").click(function(){				
				// Clear UI & Search
				ibObj.html("");
				
				var customSettings = settings;
				customSettings.mode = 'user';
				customSettings.user = jQuery("input.searchUser").val().replace(/ /g,'');
				
				if( customSettings.user == "" ){
					alert("Please enter a valid username.");
					return false;
				}
				
				instagramUserSearch(customSettings);
				return false;
			});
			
			jQuery("#searchByLocation .submit").click(function(){
				// Clear UI & Search
				ibObj.html("");
				
				var customSettings = settings;
				customSettings.mode = 'location';
				customSettings.locationID = jQuery("select.searchLocation").val().replace(/ /g,'');
				
				if( customSettings.locationID == "" ){
					alert("Please enter a valid location.");
					return false;
				}
				
				instagramFetch(customSettings);
				return false;
			});
			
			jQuery(document).on("click", ".instagram-user-all", function(){
				// Clear UI
				ibObj.html("");

				var customSettings = settings;
				customSettings.mode = 'user';
				customSettings.userID = jQuery(this).attr("rel");

				instagramFetch(customSettings);
			});
			
			// List View Only
			jQuery(document).on({
				mouseenter: function() {
					var thisPhoto = jQuery(this); 
					var obHeight = thisPhoto.height();
					var obWidth = thisPhoto.width();

					// Date Conversion
					var obDate = parseInt(thisPhoto.attr("data-created"));
					obDate = new Date( obDate * 1000 );
					obDate = dateFormat(obDate, "dddd, mmmm dS, yyyy, h:MM:ss TT");

					var photoDesc = '<div class="instagram-hover-cover">';
					photoDesc +=        '<h3>' + thisPhoto.attr("data-name") + '</h3>';
					photoDesc +=        '<em>' + obDate + '</em>';				
					photoDesc +=        '<p>' + thisPhoto.attr("title").substring(0,196) + '</p>';
					photoDesc +=    '</div>';

					// Add Hover UI
					thisPhoto.append(photoDesc);

					// Size Hover UI
					jQuery('.instagram-hover-cover').hide().css({
						"height" : "164px",
						"width" : obWidth 
					}).slideDown("fast");
				},
				mouseleave: function(){
					var thisPhoto = jQuery(this);

					thisPhoto.find(".instagram-hover-cover").delay(500).slideUp("fast", function(){
						jQuery(this).remove();
					});				
				}			
			}, ".list .instagram-photo");
			
		});

	});
}