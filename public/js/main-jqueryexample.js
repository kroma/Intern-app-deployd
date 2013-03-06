       /*Document ready for jquery mobile
        IMPORTANT! dont bind it to the document, bind it to the id of the first page in order
      */
      
      var localStorageKey = "vilaCouponUsed";

      $('#mainpage').bind('pageinit', function(){

        if (Modernizr.localstorage) {
            
            if($.checkExistInLocalStorage()) {
              if(localStorage.getItem(localStorageKey)=="notused") {
                $.bindValidCouponButton();
              } else {
                $.displayUsedCoupon();
              }
            } else {
              $.createItemLocalStorage();
              $.bindValidCouponButton();
            }         
        } else {
          $("#maincontent").html('<div data-role="content" data-theme="a" style="color: red; text-align:left; margin: 50px;"><h1>VIKTIG</h1>Du kan ikke dra nytte av dette tilbudet for telefonen din støtter ikke "Local Storage". <br/><br/>Du bør oppgradere programvaren i telefonen, eller bruke en nyere modell.</div>');
        }

      });
        
      	$.bindValidCouponButton = function() {
	        $("#couponimg").click(function() {
	          $.mobile.changePage('#dialogConfirmCouponUse','pop',false,true);
	        });

	        $("#confirmCoupon").click(function() {
	          $.useCoupon();
	          $.mobile.changePage('#mainpage', { reverse: true });
	        });
	    }

        $.displayUsedCoupon = function() {
            $("#couponimg").attr("src","img/gfx/coupon-validated.png");
        }

        $.useCoupon = function() {
              localStorage[localStorageKey] = "used";
              $("#couponimg").unbind('click');
              $.displayUsedCoupon();
        }

        $.addToLocalStorage = function() {
              localStorage.setItem(localStorageKey, 'used');
              $.showLocalStorage();
        }

        $.checkExistInLocalStorage = function() {
            var item = localStorage.getItem(localStorageKey);
            if (item == null) {
                item = 'Nothing in store';
                return false;
            }
            else if (item.length === 0) {
                item = 'Store contains empty value';
                return false;
            } else {
              return true;
            }
            //$.removeLocalStorage();
        }
        $.createItemLocalStorage = function() {
          localStorage.setItem(localStorageKey, 'notused');
          //localStorage[localStorageKey] = "notused";
          //alert("created item = "+localStorage.getItem(localStorageKey));
        }


//GOOOGLE MAPS
//Using other one