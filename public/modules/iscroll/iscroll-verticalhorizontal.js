//setup myScroll var to handle scrolling with iscroll
myScroll = [];

//handle the vertical + horizontal scroll
$(document).delegate('[data-role="page"]', 'pageshow', function () {

    //vertical scroller
    if ($.mobile.activePage.find('#wrapper-vert').length > 0) {

            if (this.id in myScroll) {

                setTimeout(function () {
                    myScroll['area'].refresh();
                }, 100);

            } else {
               myScroll[this.id] = new iScroll($.mobile.activePage.find('#wrapper-vert')[0].id, {
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
                });

                setTimeout(function () {
                    myScroll['area'].refresh();
                }, 100);

            }
    }//closing if

    //horizontal scroller
    if ($.mobile.activePage.find('#wrapper-horz').length > 0) {

        if (this.id in myScroll) {
            myScroll[this.id].refresh();
        } else {
            myScroll[this.id] = new iScroll($.mobile.activePage.find('#wrapper-horz')[0].id, {
                hScroll        : true,
                vScroll        : false,
                hScrollbar     : true,
                vScrollbar     : false,
                fixedScrollbar : true,
                fadeScrollbar  : false,
                hideScrollbar  : false,
                bounce         : true,
                momentum       : true,
                lockDirection  : true,
                scrollbarClass: 'myScrollbar'
            });

        }
    }//closing if      

});//closing delgate of pageshow