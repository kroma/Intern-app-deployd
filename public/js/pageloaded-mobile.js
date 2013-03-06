// Load product images after page is loaded

function resetWidthHeightsliders () {
	
	// Reset height category slider
	var countCategories = $("#categoryslider li").length;
	$('#categoryslider .scroll-content-vert').css('height', 'auto');
	// Reset width presentation slider
	var countPresentationslides = $("#presentationslider li.slide").length;
	$('#presentationslider .scroll-content-horz').css('width', 'auto');
	$('#presentationslider').css('display', 'block').slideUp('fast');
	
}
function mobile () {
	
	// Set tablet to deactive
	KromaApp.tabletActive = false;
	// Set mobile to active
	KromaApp.mobileActive = true;
	
	// If menu item is cleck show links
	$('a.showmenu').click(function() {
		
		var menu = $('.links').hasClass('active');
		
		if(menu === false){
			// Mobile and tablet portrait
			$(this).addClass('active');
			$('.links').slideDown('normal').addClass('active');
		}else{
			$(this).removeClass('active');
			$('.links').slideUp('normal').removeClass('active');
		}
		
	});
	
	var presentationlist = $('#presentationslider');
	$(presentationlist).slideUp('normal');
	
	// If category item is clicked
	$('.categories a').click(function() {
		
		// Set vars to work with
		var menu = $('.categories').hasClass('active');
		var menuitem = $(this);
		var menuitemactive = $(this).hasClass('active');
		
		// If category active item is clicked show categories
		if(menuitemactive) {
			
			if(menu === false){
				$(presentationlist).slideUp('normal');
				$('.categories').addClass('active');
				$('.categories a').fadeIn('normal').removeClass('active');
			}else{
			}
			
		// If new category is selected make it active and hide the rest
		}else{
			
			if(menu === true){
				$(menuitem).removeClass('active');
				$(menuitem).addClass('active');
				$('.categories').removeClass('active');
				$('.categories a:not(.active)').fadeOut('normal').removeClass('active');
				$(presentationlist).addClass('active');
				$(presentationlist).not(":animated").slideDown('normal');
			}else{
			}
		}
		
	});
	
	// Close all presentations
	$('.presentation:not(.active) .content').slideUp('fast');
	// If presentation item is click show details
	$('article.presentation h1').click(function() {
		
		var presentation = $(this).parent().parent().hasClass('active');
		
		if(presentation === false){
			// Close all presentations
			$('.presentation').removeClass('active');
			$('.presentation .content').slideUp('fast');
			
			// Open clicked presentation
			$(this).parent().parent().addClass('active');
			$(this).parent().parent().find('.content').slideDown('fast');
		}else{
			// Close open presentation
			$(this).parent().parent().removeClass('active');
			$(this).parent().parent().find('.content').slideUp('fast');
		}
		
	});
	
}