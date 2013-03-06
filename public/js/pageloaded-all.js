var KromaApp = KromaApp || {};

// Variables
KromaApp.isMobile = function(){
	return ($(window).width() <=768);
};
KromaApp.id;
KromaApp.idMobile;
KromaApp.mobileActive = false;
KromaApp.tabletActive = false;
KromaApp.dialog;
//	KromaApp.modus;
KromaApp.isiPad = navigator.userAgent.match('iPad') != null;
KromaApp.deviceOrientation = function(){
	var dOrientation;
	if(window.orientation === 90){
		dOrientation = 'landscape';
	} else if(window.orientation === -90){
		dOrientation = 'landscape';
	} else if($(window).width() > 768){
		dOrientation = 'landscape';
	}
	return dOrientation;
};
// If retina enabled add class to body
if(window.devicePixelRatio >= 2) {
	KromaApp.retinaEnabled = true;
	KromaApp.retina = '@2x';
	$('body').addClass('retina');
}else{ KromaApp.retina = ''; }

// Load product images after page is loaded
//$(document).ready(function() {
$(document).delegate('[data-role="page"]', 'pageshow', function () {
	
	// First time loaded
	// Activate mobile
	if (KromaApp.isMobile()===true) {
		if(KromaApp.mobileActive === false){
			mobile();
		}
	}else {
		// Activate sliders
		if(KromaApp.tabletActive === false){
			sliders();
		}
	}
	
});

$(window).load(function() {
	
	// When user window size changes
	$(window).resize(function() {
		// Activate sliders
		if (KromaApp.isMobile()===false) {
			if(KromaApp.mobileActive === false){
				clearTimeout(KromaApp.id);
				KromaApp.id = setTimeout(sliders, 500);
			}
		}
		// Activate mobile
		else {
			if(KromaApp.mobileActive === false){
				clearTimeout(KromaApp.idMobile);
				KromaApp.idMobile = setTimeout(resetWidthHeightsliders, 500);
				KromaApp.idMobile = setTimeout(mobile, 500);
			}
		}
	});
	
	// When user rotates device
	$(document).live( "orientationchange", function(){
		// Activate mobile
		if (KromaApp.isMobile()===true) {
			if(KromaApp.mobileActive === false){
				mobile();
			}
		}else {
			// Activate sliders
			if(KromaApp.tabletActive === false){
				alert('test');
				sliders();
			}
		}
	});
	
	// Check if presentation has been updated
	$('.presentation').find('.updated').parent().parent().parent().parent().find('h1').append('<span class="icon"><img src="img/gfx/icon-datenew'+KromaApp.retina+'.png" width="13" height="13" /></span>');
	
	// If menu links is clicked close links
	$('.links a').click(function() {
		
		var menuitem = $(this).attr("id").replace("nav", "");
		
		// Show dialogs
		if(KromaApp.isMobile()===true){
			// Mobile and tablet portrait
			$('a.showmenu').removeClass('active');
			$('.dialog').slideUp('normal').removeClass('active');
			$('.links').slideUp('normal').removeClass('active');
			if(menuitem !== 'admin'){
				$('#overlay').fadeIn('normal');
			}
			$('#'+menuitem).addClass('active').slideDown('normal');
		}else{
			// Tablet landscape
			$('a.showmenu').removeClass('active');
			$('.dialog').slideUp('normal').removeClass('active');
			$('.links').removeClass('active');
			if(menuitem !== 'admin'){
				$('#overlay').fadeIn('normal');
			}
			$('#'+menuitem).addClass('active').slideDown('normal');
		}
		
	});
	// If send pdf to client button is pressed
	$('.send a').click(function() {
	
		KromaApp.dialog = $(this).parent().parent().parent().parent().attr("id");
		
		// Hide dialogs
		$('#overlay').fadeIn('normal');
		$('#sendtoclient').addClass('active').slideDown('normal');
		
	});
	// If dialog close button is pressed
	$('.dialog .btnclose').click(function() {
	
		KromaApp.dialog = $(this).parent().parent().parent().parent().attr("id");
		
		// Hide dialogs
		$('#overlay').fadeOut('normal');
		$('#'+KromaApp.dialog).removeClass('active').slideUp('normal');
		
	});
	// Close dialog and fadeout overlay
	function closeDialog (dialog) {
	
		KromaApp.dialog = dialog;
		
		// Hide dialogs
		$('#overlay').fadeOut('normal');
		$('#'+KromaApp.dialog).removeClass('active').slideUp('normal');
		
		alert('Reset form and go back to #mainpage not login. Use closeDialog(dialog); to close the dialog and fade out the overlay.');
		
	}
	// If dialog submit button is pressed
	$('.dialog input[type="submit"]').click(function() {
	
		KromaApp.dialog = $(this).parent().parent().parent().parent().parent().parent().attr("id");
		
		closeDialog(KromaApp.dialog);
		
	});
	
});