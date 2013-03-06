/*Document ready for jquery mobile
IMPORTANT! dont bind it to the document, bind it to the id of the first page in order
*/

//global vars go here

// Track all page views
$('[data-role=page]').live('pageshow', function (event, ui) {
    try {
//        _gaq.push(['_setAccount', 'YOUR_GA_ID']);
        hash = location.hash;
        if (hash) {
            _gaq.push(['_trackPageview', hash.substr(1)]);
        } else {
            _gaq.push(['_trackPageview']);
        }
    } catch(err) {
    }
});

//main
// For normal sites
//$(document).ready(function() {
// For jQuery mobile sites
$(window).load(function() {

//			How to make the filters
//			= is exactly equal
//			!= is not equal
//			^= is starts with
//			$= is ends with
//			*= is contains

	// Prepair links with classes
	hostname = new RegExp(location.host);
    // Act on each link
    $('a').each(function(){
	
	    // Store current link's url
	    var url = $(this).attr("href");
	
	    // Test if current host (domain) is in it
	    if(hostname.test(url)){
	       // If it's local...
	       $(this).addClass('local');
	    }
	    else if(url.slice(0, 1) == "#"){
	        // It's an anchor link
	        $(this).addClass('anchor'); 
	    }
	    else if(url.slice(0, 1) == "/"){
	    	$(this).addClass('local'); 
	    }
	    else {
	       // a link that does not contain the current host
	       $(this).addClass('external');                        
	    }
	});

	// Simple version
	$('a').click(function() {
	
//      alert('hello world');
		
		// Get information
		var href = $(this).attr('href');
      	var relexternal = $(this).attr('rel');
      	
      	// Check if external or internal link
      	if(relexternal == 'external') {
			_gaq.push(['_trackEvent', 'External links', 'Click', $(this).attr('href')]);
		}else{
			_gaq.push(['_trackEvent', 'Internal links', 'Click', $(this).attr('href')]);
		}
	
	});
	
	// Extended version
	/*$('a').click(function() {
		var href = $(this).attr('href');
		var relexternal = $(this).attr('rel');
		
		// Special Links
		if(this+'[href^="mailto"]') {
			_gaq.push(['_trackEvent', 'Mail to', 'Click', $(this).attr('href')]);
		}
		else if(this+'[href^="tel"]') {
		    _gaq.push(['_trackEvent', 'Phone number', 'Click', $(this).attr('href')]);
		}
		else if(this+'[href^="javascript"]') {
		    _gaq.push(['_trackEvent', 'Javascript', 'Click', $(this).attr('href')]);
		}
		
		// Downloads
	    else if(this+'[href$="pdf"]') {
	        _gaq.push(['_trackEvent', 'PDF Downloads', 'Download', $(this).attr('href')]);
	    }
	    else if(this+'[href$="zip"]') {
	        _gaq.push(['_trackEvent', 'Zip Downloads', 'Download', $(this).attr('href')]);
	    }
	    else if(this+'[href$="rar"]') {
	        _gaq.push(['_trackEvent', 'Rar Downloads', 'Download', $(this).attr('href')]);
	    }
		
		// Other links
		else if(this.hasClass('local')) {
	    	_gaq.push(['_trackEvent', 'Local link', 'Click', $(this).attr('href')]);
	    }
	    else if(this.hasClass('anchor')) {
	    	_gaq.push(['_trackEvent', 'Anchor link', 'Click', $(this).attr('href')]);
	    }
	    else if(this.hasClass('external')) {
	    	_gaq.push(['_trackEvent', 'External link', 'Click', $(this).attr('href')]);
	    }
	    else if(relexternal == 'external') {
	    	_gaq.push(['_trackEvent', 'External link', 'Click', $(this).attr('href')]);
	    }
	    else {
	    	_gaq.push(['_trackEvent', 'Undefined link', 'Click', $(this).attr('href')]);
	    }
	});
	
	// Forms
	$('input').focus(function() {
	    _gaq.push(['_trackEvent', 'Form fields', 'Focus', $(this).attr('name')]);
	});
	$('select').focus(function() {
	    _gaq.push(['_trackEvent', 'Form fields', 'Focus', $(this).attr('name')]);
	});
	$('textarea').focus(function() {
	    _gaq.push(['_trackEvent', 'Form fields', 'Focus', $(this).attr('name')]);
	});
	$('input[type="submit"]').click(function() {
	    _gaq.push(['_trackEvent', 'Form fields', 'Click', $(this).attr('name')]);
	});
	$('input.submit').click(function() {
	    _gaq.push(['_trackEvent', 'Form fields', 'Click', $(this).attr('name')]);
	});*/

});


//functions go here