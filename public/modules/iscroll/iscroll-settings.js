// Make iScroll slider work
	
var myScroll = [];
$(document).delegate('[data-role="page"]', 'pageshow', function () {

    var $page = $(this);
//    var isiPad = navigator.userAgent.match(/iPad/i) != null;
//    $(window).bind('orientationchange', function(event) {
//    	orientation = Math.abs(window.orientation) == 90 ? 'landscape' : 'portrait';
//    	alert(isiPad + orientation);
//    	if(orientation === 'landscape'){
//    	}
//    	if(orientation === 'portrait'){
//    	}
//    });

    // setup iScroll
    $($page.find('.slider')).each(function(index) {
    
		myScroll = new iScroll('presentationslider', {
			snap: true,
			momentum: false,
			hScrollbar: false,
			onScrollEnd: function () {
				document.querySelector('#indicator > li.active').className = '';
				document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
			}
		 });
//        var scroller_id = $(this).get(0);

        myScroll.push(
            new iScroll('categoryslider', {
                hScroll        : false,
                vScroll        : true,
                hScrollbar     : false,
                vScrollbar     : true,
                fixedScrollbar : true,
                fadeScrollbar  : false,
                hideScrollbar  : false,
                bounce         : true,
                momentum       : true,
                lockDirection  : true,
                scrollbarClass: 'myScrollbar'
            }));
            
              //Get Product ID from link
//            $('.slider li.thumb a').click(function () {
//            	var url = $(this).attr('href');
//            	var getProductID = url.replace("#product?id=", "");
//            	var getProductID = '#product'+getProductID;
//            	alert(getProductID);
//            	$('.maincontent').find('.product').removeClass('active');
//	            $('.maincontent').find(getProductID).addClass('active');
//            });
    });

});

// Get Product ID from url
//$("#product").live("pageshow", function(e) { 
//	var query = $(this).data("url").split("?")[1];
//	query = query.replace("id=","");
//	var getProductID = '#product'+query;
//	$('.maincontent').find('.product').removeClass('active');
//    $('.maincontent').find(getProductID).addClass('active');
//});

$(document).delegate('[data-role="page"]', 'pagehide', function () {

//	unset and delete iScroll
    for (x in myScroll)
    {
        myScroll[x].destroy();
        myScroll[x] = null;
        myScroll.splice(x, 1);
    }

});