$(document).ready(function(){

    //Initiate validation
    $("#kromaform").validate({
     submitHandler: function(form) {
      //On success send the data
      var formData = $('#kromaform').serialize();
      console.log('Sent data is: ' + formData);
      send_number(formData);
     }
    });
  

});

function send_number(formData)
{

  if(window.XMLHttpRequest)
  {
    xmlrequest=new XMLHttpRequest();
  }else
  {
    xmlrequest=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlrequest.onreadystatechange=function()
  {
    if(xmlrequest.status==200 && xmlrequest.readyState==4)
    {
      var response=xmlrequest.responseText;
      var error_id=response.substr(response.indexOf("=")+1,1);
      var check_stored=response.indexOf("Skjemaet+er+sendt+inn");
      console.log("checked stored="+check_stored);


      //If it was sent and saved to db successful
      if(error_id==0 || check_stored > 0)
      {
        $("#kromaform").resetForm();
        $.mobile.changePage('#formpopup', 'pop', true, true);
      }
      //Else show the error
      else {
        alert("ERROR: "+response);
      }



    }
  }
  //xmlrequest.open("GET","do.php",true);
  xmlrequest.open("GET","serverscripts/do.php?"+formData,true);
  xmlrequest.send();
}