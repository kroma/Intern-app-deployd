$(document).ready(function() {
  $('#login_form').submit(function() {
      var username = $('#username').val();
      var password = $('#password').val();

      dpd.users.login({"username": username, "password": password, "blocked": false}, function(session, error) {
        if (error) {
			$('#error_msg').html("<label style='color:red; display:block;'>Wrong Password</label>");
          //alert(error.message);
        }
		else 
		{
			console.log(session);
			var query = {"id":session.uid};
			dpd.users.get(query, function (result) {
				if(result.blocked == true)
				{
					$('#error_msg').html("<label style='color:red'> Sorry you are a blocked user</label>");
					//location.href = "/index.html";
				}
				else
				{
					if(result.role == 'Administrator')
					{
						location.href = "/add_user.html";
					}
					else if(result.role == 'Sales manager')
					{
						location.href = "/#mainpage";
					}
				}
				console.log(result);
			});
          //location.href = "/add_user.html";
        }
      });

      return false;
    });
	
	$('#add_user').submit(function() {
	//alert("m here");
	//alert($('#username').val());
      var username = $('#username').val();
      var password = $('#password').val();
	  //alert($('#role').val());
	  var role = $('#role').val();
	  var blocked = $('#blocked').is(':checked');
	  var uId = '';
	  //alert(blocked);
       created = new Date();
	 // alert(username+"  :  "+password+"  :  "+role+"  :  "+blocked);

      if (!username) {
        alert("Username is required");
      } else if (!password) {
        alert("Password is required");
      } else {
		//alert("done");
        dpd.users.post({"username": username, "password": password, "DateCreated":created, "role":role, "blocked":blocked}, function(user, error) {
          if (error) {
            //alert(JSON.stringify(error));
			//$('#err_msg').
			if(JSON.stringify(error.errors) == '{"username":"is already in use"}')
				document.getElementById('err_msg').innerHTML = 'This username already exists';
          } else {
			uId = user.id;
			//alert(uId);
			//alert(username);
            dpd.email.post({
			  to: username,
			  subject: "MyApp registration",
			  text: username + ",\n\n" + "Thank you for registering for MyApp!",
			  html: "<a href='http://europa.kroma.no.c.bakabo.net:2403/reset_password.html?"+uId+"&'>Click here to add your password</a>"
			}, function(error) {
				 if (error) {
					//alert(JSON.stringify(error));
					return false;
				} else {
					location.href = "/add_user.html";
				}
			});
          }
        });
		
      }

      return false;
    });
	
	$('#support_form').submit(function() {
		//alert("form submitted");
		var message = $('#message').val();
		var pres_selec = $('#pres_selec').val();
		var cat_selec = $('#cat_selec').val();
		var issue_ttl = $('#issue_ttl').val();
		var query = {"role":"Administrator","blocked":false};

		dpd.users.get(query, function (result) {
		  console.log(result);
		  for (i=0;i<result.length;i++)
		  {
			//alert(result[i].username);
				dpd.email.post({
				  to: result[i].username,
				  subject: "Support Form",
				  text: result[i].username + ",\n\n" + "New Issue",
				  html: "Message: " + message +"</br> Category Name: " + cat_selec + "</br>Presentation Name: " + pres_selec + "</br> Issue: " + issue_ttl
				}, function(error) {
					 if (error) {
						//alert(JSON.stringify(error));
						$('#error_msg').text("Sorry! the mail was not sent. Try after some time.");
					} else {
						location.href = "/#mainpage";
					}
				});
			}
		});
      return false;
    });
	
	$('#logout-btn').click(function() {
      dpd.users.logout(function(res, err) {
        location.href = "/";
      });
    });
	
	$('#reset_pass').click(function() {
	  //alert($('#uId').val());
	  //alert($('#sent_time').val());
	  uId = $('#uId').val();
	  var username = '';
	  var role = '';
	  var blked = '';
	  var dateCreated = '';
	  dpd.users.get(uId, function (result) {
		uId = result.id;
		username = result.username;
		role = result.role;
		blked = result.blocked;
		dateCreated = result.DateCreated;
		console.log(result);
	  });
      var confirmPassword = $('#confirm-password').val();
      var password = $('#password').val();
	  var usernm = '';
	  up_date = new Date();
	  if (!password) {
        alert("Password is required");
      } else if (!confirmPassword) {
        alert("Confirm Password is required");
      } else if(confirmPassword !== password)
	  {
		alert("Passwords do not match");
      } else {
		dpd.users.put(uId, {"password":password, "DateUpdated":up_date}, function(result, err) {
			if(err) return console.log(err);
		    console.log(result, result.id);
			usernm = result.username;
			//console.log(result);
			alert("done : "+result.username);
        });
		//alert(usernm);
		if(usernm == '')
		{
		}
		else 
		{
			dpd.users.login({"username": usernm, "password": password, "blocked": false}, function(session, error) {
				if (error) {
					$('#error_msg').html("<label style='color:red'>Wrong Password</label>");
				  alert(error.message);
				}
				else 
				{
					console.log(session);
					var query = {"id":session.uid};
					dpd.users.get(query, function (res) {
						if(res.blocked == true)
						{
							$('#error_msg').html("<label style='color:red'> Sorry you are a blocked user</label>");
							//location.href = "/index.html";
						}
						else
						{
							if(res.role == 'Administrator')
							{
								location.href = "/add_user.html";
							}
							else if(res.role == 'Sales manager')
							{
								location.href = "/#mainpage";
							}
						}
						console.log(res);
					});
				  //location.href = "/add_user.html";
				}
			  });
           // location.href = "/index.html";
			//alert(res);
		}
	  }
	});
	
	$('#forgot_pass').click(function() {
		if($('#username').val() == '')
		{
			alert('Please enter Username');
		}
		else
		{
		  username = $('#username').val();
		  var query = {"username":username};
			dpd.users.get(query, function (res) {
				//alert(res[0].id);
				uId = res[0].id;
				dpd.email.post({
				  to: username,
				  subject: "MyApp registration",
				  html: "<a href='http://europa.kroma.no.c.bakabo.net:2403/reset_password.html?"+uId+"'>Click here to add your password</a>"
				}, function(error) {
					 if (error) {
						//alert(JSON.stringify(error));
					} else {
						location.href = "/index.html";
					}
				});
			});
		}
	});
	
	$('#add_category').submit(function() {
	//alert("m here");
      var title = $('#title').val();
	  var published = $('#published').is(':checked');
	  //alert(published);
	  if(published == true)
		publish = "Yes";
	  else
		publish = "No";
       created = new Date();
      if (!title) {
        alert("Title is required");
      } else {
		var cat_query = {"title":title};
		dpd.categories.get(cat_query, function (cat_result) {
		  console.log(cat_result);
		  if(cat_result)
			alert("Category name exists");
		  else
		  {
			//alert("done");
			dpd.categories.post({"title": title, "published":publish, "dateCreated":created, "dateUpdated":created}, function(cateory, error) {
			  if (error) {
				//alert(JSON.stringify(error));
			  } else {
				//alert(cateory.id);
				location.href = "/add_category.html";
			  }
			});
		  }
		});
      }
      return false;
    });
	
	$('#add_tag').submit(function() {
	//alert("m here");
      var title = $('#title').val();
	  var published = $('#published').is(':checked');
	  //alert(published);
	  if(published == true)
		publish = "Yes";
	  else
		publish = "No";
       created = new Date();
      if (!title) {
        alert("Title is required");
      } else {
		var tag_query = {"title":title};
		dpd.tags.get(tag_query, function (tag_result) {
		  console.log(tag_result);
		  if(tag_result)
			alert("Tag name exists");
		  else
		  {
		//alert("done");
			dpd.tags.post({"title": title, "published":publish, "dateCreated":created, "dateUpdated":created}, function(cateory, error) {
			  if (error) {
				alert(JSON.stringify(error));
			  } else {
				//alert(cateory.id);
				location.href = "/add_tag.html";
			  }
			});
		  }
		});
      }
      return false;
    });
	
	$('#add_presentation').submit(function() {
	//alert("m here");
      var title = $('#title').val();
	  var desc = $('#desc').val();
	  var cat = new Array();
	  var tag = new Array();
	  cat[0] = $('#cat').val();
	  tag[0] = $('#tag').val();
	  var published = $('#published').is(':checked');
	  var file_size_pdf = $('#file_size_pdf').val();
	  if(file_size_pdf == '')
		file_size_pdf = 0;
	  var file_size_ppt = $('#file_size_ppt').val();
	  if(file_size_ppt == '')
		file_size_ppt = 0;
	  var file_size_key = $('#file_size_key').val();
	  if(file_size_key == '')
		file_size_key = 0;
	  var file_nm_pdf = $('#file_res_pdf').val();
	  var file_nm_ppt = $('#file_res_ppt').val();
	  var file_nm_key = $('#file_res_key').val();
	  //alert(published);
	  if(published == true)
		publish = "Yes";
	  else
		publish = "No";
       created = new Date();
      if (!title) {
        alert("Title is required");
      } else {
		//alert("done");
        dpd.presentation.post({"title": title, "description":desc, "category":cat, "tags":tag, "fileNameKey":file_nm_key, "fileSizeKey":file_size_key, "fileNamePpt":file_nm_ppt, "fileSizePpt":file_size_ppt, "fileNamePdf":file_nm_pdf, "fileSizePdf":file_size_pdf,"published":publish, "dateCreated":created, "dateUpdated":created}, function(cateory, error) {
          if (error) {
            alert(JSON.stringify(error));
          } else {
			//alert(cateory.id);
            location.href = "/add_presentation.html";
          }
        });
      }
      return false;
    });
	
	$('#reset_form').submit(function() {
	//alert("m here");
	  
	  var uId = '';
	  var old_pass = '';
	  var username = '';
	  var role = '';
	  var blked = '';
	  var dateCreated = '';
	  var old_password = $('#old_password').val();
	  var new_password = $('#new_password').val();
	  var confirm_password = $('#confirm_password').val();
	  var up_date = new Date();
	  dpd.users.me(function(me) {
		uId = me.id;
		username = me.username;
		role = me.role;
		blked = me.blocked;
		dateCreated = me.DateCreated;
		console.log(me);
		var usnm = username;
	  
	  //alert(old_password);
		  var ood = old_password;
		  dpd.users.login({"username": username, "password": old_password}, function(session, error) {
			if (error) {
			  //alert(error.message);
			  //alert("Old password did not matched.");
			  $('#error_msg').text("Old password did not matched.");
			  //location.href = "/";
			}
			else 
			{
				dpd.users.logout(function(res, err) {
					//alert("logged out");
					var log = 'logged out';
				  });
				dpd.users.del(uId, function (err) {
				  if(err) console.log(err);
				});
				dpd.users.post({"username": username, "password": new_password, "DateCreated":dateCreated, "role":role, "blocked":blked, "DateUpdated":up_date}, function(user, error) {
				  if (error) {
					//alert(JSON.stringify(error));
					var er = 'error';
				  } else {
					//alert("user created");
					uId = user.id;
					//alert(uId);
					dpd.users.login({"username": username, "password": new_password}, function(session, error) {
						if (error) {
						  //location.href = "/";
						}
						else{
							$('#success_msg').text("Password Changed");
							//alert("Password Changed");
							if(session.role == 'Administrator')
							{
								location.href = "/add_user.html";
							}
							/*else if(res.role == 'Sales manager')
							{
								location.href = "/#mainpage.html";
							}*/
							$('#old_password').val('');
							$('#new_password').val('');
							$('#confirm_password').val('');
							return false;
						}
					});
				  }
				});
				
			}
		});
		//alert("user deleted");
		
		//alert(username +"--"+ role +"--"+ blked +"--"+ dateCreated);
		var u = username;
		
	  });
	 // alert(uId +"--"+ username +"--"+ role +"--"+ blked +"--"+ dateCreated);
	  //alert(old_pass);
	  //alert(username);
	  
    });
	
	/*$('input[type="checkbox"]').click(function(){  // append click to any checkbox
		if ($(this).is(':checked')) {
			$(this).val('on');
		}
		else
		{
			$(this).val('off');
		}
	});*/
	
});

function manage(that) {
	//alert($(that).is(":checked"));
   if ($(that).is(":checked")) {
       $(that).val('true');
    }
    else {
       $(that).val('false');
    }
}

var blked = '';
function preEdit(uId, collection)
	{
		if(collection == 'user')
		{
			dpd.users.get(uId, function (result) {
			  console.log(result);
			  var dta = '';
			  var my_date = new Date(result.DateCreated);
			  var month = my_date.getMonth() + 1;
			  var day = my_date.getDate();
			  var year = my_date.getFullYear();
			  //alert(result.DateCreated);
			  dta += '<td>'+result.username+'</td><td>'+month + '-' + day + '-' + year+'</td>';
			  if(result.blocked == true)
				dta += '<td><input id="'+result.id+'_blocked" type="checkbox" checked="yes" onChange="manage(this)"/></td>';
			  else if(result.blocked == false)
				dta += '<td><input id="'+result.id+'_blocked" type="checkbox"  onChange="manage(this)"/></td>';
				dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:SaveEdit(\''+result.id+'\', \'user\')">Save</a></div></div></td>';
				dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:deleteData(\''+result.id+'\', \'user\')"><i class="icon-trash"></i></a></div></div></td>';
			  $('#'+uId).html(dta);
			});
			//alert(dta);
		}
		else if(collection == 'cat')
		{
			dpd.categories.get(uId, function (result) {
			  console.log(result);
			  var dta = '';
			  dta += '<td><input type="text" value="--" id="'+result.id+'_order"/></td><td><input type="text" value="'+result.title+'" id="'+result.id+'_title" onChange="document.getElementById(\''+result.id+'_title\').value=this.value"/></td>';
			   if(result.published == 'Yes')
				dta += '<td><input id="'+result.id+'_published" type="checkbox" checked="yes" onChange="manage(this);"/></td>';
			  else if(result.published == 'No')
				dta += '<td><input id="'+result.id+'_published" type="checkbox"  onChange="manage(this);"/></td>';	
			  dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:SaveEdit(\''+result.id+'\', \'cat\')">Save</a></div></div></td>';
			  dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:deleteData(\''+result.id+'\', \'cat\')"><i class="icon-trash"></i></a></div></div></td>';
			  $('#'+uId).html(dta);
			});
			
		}
		else if(collection == 'tag')
		{
			dpd.tags.get(uId, function (result) {
			  console.log(result);
			  var dta = '';
			  dta += '<td><input type="text" value="--" id="'+result.id+'_order"/></td><td><input type="text" value="'+result.title+'" id="'+result.id+'_title" onChange="document.getElementById(\''+result.id+'_title\').value=this.value"/></td>';
			   if(result.published == 'Yes')
				dta += '<td><input id="'+result.id+'_published" type="checkbox" checked="yes" onChange="manage(this);"/></td>';
			  else if(result.published == 'No')
				dta += '<td><input id="'+result.id+'_published" type="checkbox"  onChange="manage(this);"/></td>';	
			  dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:SaveEdit(\''+result.id+'\', \'tag\')">Save</a></div></div></td>';
			  dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:deleteData(\''+result.id+'\', \'tag\')"><i class="icon-trash"></i></a></div></div></td>';
			  $('#'+uId).html(dta);
			});
			
		}
		if(collection == 'presentation')
		{
			dpd.presentation.get(uId, function (result) {
			  console.log(result);
			  var dta = '';
			  var my_date = new Date(result.dateCreated);
			  var month = my_date.getMonth() + 1;
			  var day = my_date.getDate();
			  var year = my_date.getFullYear();
			  //alert(result.DateCreated);
			  dta += '<td><input type="text" value="'+result.title+'" id="'+result.id+'_title" onChange="document.getElementById(\''+result.id+'_title\').value=this.value"/></td><td>'+month + '-' + day + '-' + year+'</td>';
			  if(result.published == 'Yes')
				dta += '<td><input id="'+result.id+'_published" type="checkbox" checked="yes" onChange="manage(this);"/></td>';
			  else if(result.published == 'No')
				dta += '<td><input id="'+result.id+'_published" type="checkbox"  onChange="manage(this);"/></td>';	
				dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:SaveEdit(\''+result.id+'\', \'presentation\')">Save</a></div></div></td>';
				dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:deleteData(\''+result.id+'\', \'presentation\')"><i class="icon-trash"></i></a></div></div></td>';
			  $('#'+uId).html(dta);
			});
			//alert(dta);
		}
	}	
	
	/*function updatevariable(data) { 
		alert(data);
		if(data == 'on')
			blked = 'true';
		else if(data == 'off')
			blked = 'false';
		//alert(blked);
	}*/ 
	
	function SaveEdit(uId, collection)
	{
		if(collection == 'user')
		{
			var blocked = new Boolean();
			//alert($('#'+uId+'_blocked').val());
			if($('#'+uId+'_blocked').val() == 'true')
				blocked = true;
			else if($('#'+uId+'_blocked').val() == 'false')
				blocked = false;
			/*if(blked == 'false')
				blocked = false;
			else if(blked == 'true')
				blocked = true;*/
			up_date = new Date();
			dpd.users.put(uId, {"DateUpdated":up_date, "blocked":blocked}, function(result, err) {
			  if(err) return console.log(err);
			  console.log(result, result.id);
			  var dta = '';
			  var my_date = new Date(result.DateCreated);
			  var month = my_date.getMonth() + 1;
			  var day = my_date.getDate();
			  var year = my_date.getFullYear();
			  dta += '<td id="'+result.id+'_username">'+result.username+'</td><td>'+month + '-' + day + '-' + year+'</td>';
			  if(result.blocked == true)
				dta += '<td><img src="./img/checkbox-checked.png"/></td>';
			  else if(result.blocked == false)
				dta += '<td><img src="./img/checkbox-unchecked.png"/></td>';
			  dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:preEdit(\''+result.id+'\', \'user\')"><i class="icon-pencil"></i></a></div></div></td>';
			  dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:deleteData(\''+result.id+'\', \'user\')"><i class="icon-trash"></i></a></div></div></td>';
			  
			  $('#'+uId).html(dta);
			});
		}
		else if(collection == 'cat')
		{
			//alert($('#'+uId+'_published').val());
			//var pulishd = $('#'+uId+'_published').val();
			if($('#'+uId+'_published').val() == 'true')
				var pulishd = 'Yes';
			else if($('#'+uId+'_published').val() == 'false')
				var pulishd = 'No';
			var order = $('#'+uId+'_order').val();
			var title = $('#'+uId+'_title').val();
			var up_date = new Date();
			dpd.categories.put(uId, {"title":title, "published":pulishd, "order":order, "DateUpdated":up_date, "blocked":blocked}, function(result, err) {
			  if(err) return console.log(err);
			  console.log(result, result.id);
			  var dta = '';
			  dta += '<td>'+result.order+'</td><td id="'+result.id+'_username">'+result.title+'</td><td>'+result.published+'</td>';
			  dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:preEdit(\''+result.id+'\', \'cat\')"><i class="icon-pencil"></i></a></div></div></td>';
			  dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:deleteData(\''+result.id+'\', \'cat\')"><i class="icon-trash"></i></a></div></div></td>';
			  $('#'+uId).html(dta);
			});
		}
		else if(collection == 'tag')
		{
			//alert($('#'+uId+'_published').val());
			//var pulishd = $('#'+uId+'_published').val();
			if($('#'+uId+'_published').val() == 'true')
				var pulishd = 'Yes';
			else if($('#'+uId+'_published').val() == 'false')
				var pulishd = 'No';
			var order = $('#'+uId+'_order').val();
			var title = $('#'+uId+'_title').val();
			var up_date = new Date();
			dpd.tags.put(uId, {"title":title, "published":pulishd, "order":order, "DateUpdated":up_date, "blocked":blocked}, function(result, err) {
			  if(err) return console.log(err);
			  console.log(result, result.id);
			  var dta = '';
			  dta += '<td>'+result.order+'</td><td id="'+result.id+'_username">'+result.title+'</td><td>'+result.published+'</td>';
			  dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:preEdit(\''+result.id+'\', \'tag\')"><i class="icon-pencil"></i></a></div></div></td>';
			  dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:deleteData(\''+result.id+'\', \'tag\')"><i class="icon-trash"></i></a></div></div></td>';
			  $('#'+uId).html(dta);
			});
		}
		else if(collection == 'presentation')
		{
			//alert($('#'+uId+'_published').val());
			if($('#'+uId+'_published').val() == 'true')
				var pulishd = 'Yes';
			else if($('#'+uId+'_published').val() == 'false')
				var pulishd = 'No';
			
			var title = $('#'+uId+'_title').val();
			var up_date = new Date();
			dpd.presentation.put(uId, {"title":title, "published":pulishd, "DateUpdated":up_date, "blocked":blocked}, function(result, err) {
			  if(err) return console.log(err);
			  console.log(result, result.id);
			  var my_date = new Date(result.dateCreated);
			  var month = my_date.getMonth() + 1;
			  var day = my_date.getDate();
			  var year = my_date.getFullYear();
			  var dta = '';
			  dta += '<td id="'+result.id+'_username">'+result.title+'</td><td>'+month + '-' + day + '-' + year+'</td>';
			  if(result.published == 'Yes')
				dta += '<td><img src="img/checkbox-checked.png"/></td>';
			  else if(result.published == 'No')
				dta += '<td><img src="img/checkbox-unchecked.png"/></td>';
				dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:preEdit(\''+result.id+'\', \'presentation\')"><i class="icon-pencil"></i></a></div></div></td>';
				dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:deleteData(\''+result.id+'\', \'presentation\')"><i class="icon-trash"></i></a></div></div></td>';
			  $('#'+uId).html(dta);
			});
		}
	}
	function deleteData(uId, collection)
	{
		if(collection == 'user')
		{
			dpd.users.del(uId, function (err) {
			  if(err) console.log(err);
			  location.href = "/users.html";
			});
		}
		else if(collection == 'cat')
		{
			dpd.categories.del(uId, function (err) {
			  if(err) console.log(err);
			  location.href = "/categories.html";
			});
		}
		else if(collection == 'tag')
		{
			dpd.tags.del(uId, function (err) {
			  if(err) console.log(err);
			  location.href = "/tags.html";
			});
		}
		else if(collection == 'presentation')
		{
			dpd.presentation.del(uId, function (err) {
			  if(err) console.log(err);
			  location.href = "/presentations.html";
			});
		}
	}
function get_presentation(cat_id)
{
	//alert('m here');
	var query = {"category":cat_id, "published":"Yes"};
	var dta = '';
	dpd.presentation.get(query, function (result) {
	  console.log(result);
	  for (i=0;i<result.length;i++)
	  {
		var my_date = new Date(result[i].dateCreated);
		var month = my_date.getMonth() + 1;
		var day = my_date.getDate();
		var year = my_date.getFullYear();
		var up_my_date = new Date(result[i].dateUpdated);
		var up_month = my_date.getMonth() + 1;
		var up_day = my_date.getDate();
		var up_year = my_date.getFullYear();
		dta += '<article class="presentation"><div class="inner"><h1>'+result[i].title+'</h1>';
		dta += '<div class="content"><div class="description">'+result[i].description+'.</div>';
		dta += '<ul class="meta nobullets"><li class="updated">'+up_day + '-' + up_month + '-' + up_year+'</li><li class="posted">'+day + '-' + month + '-' + year+'</li>';
		dta += '<li class="tags">'+result[i].tags+'</li>';
		dta += '<li class="size">'+Math.max(result[i].fileSizePdf, result[i].fileSizePpt, result[i].fileSizeKey)+'mb</li></ul>';
		dta += '<div class="files"><ul class="menu">';
		if(result[i].fileSizePpt == 0)
		{						
			dta += '<li class="ppt"></li>';
		}
		else
			dta += '<li class="ppt"><a href="http://europa.kroma.no.c.bakabo.net:2403/files/'+result[i].fileNamePpt+'" target="_blank"><img src="img/gfx/icon-powerpoint.png" alt="Download ppt" width="23" height="22" /></a></li>';
		if(result[i].fileSizeKey == 0)
		{						
			dta += '<li class="key"></li>';
		}
		else
			dta += '<li class="key"><a href="http://europa.kroma.no.c.bakabo.net:2403/files/'+result[i].fileNameKey+'" target="_blank"><img src="img/gfx/icon-keynote.png" alt="Download key" width="25" height="25" /></a></li>';
		if(result[i].fileSizePdf == 0)
		{						
			dta += '<li class="pdf"></li>';
		}
		else
			dta += '<li class="pdf"><a href="http://europa.kroma.no.c.bakabo.net:2403/files/'+result[i].fileNamePdf+'" target="_blank"><img src="img/gfx/icon-pdf.png" alt="Download pdf" width="22" height="19" /></a></li>';
		if(result[i].fileSizePdf == 0)
			dta += '<li class="send"></li>';
		else
			dta += '<li class="send"><a href="#"><img src="img/gfx/icon-send.png" alt="Send pdf to client" width="24" height="12" /></a></li>';
		dta += '</ul></div></div></div></article>';
		//dta += '<tr id="'+result[i].id+'"><td id="'+result[i].id+'_username">'+result[i].title+'</td><td>'+month + '-' + day + '-' + year+'</td><td>'+result[i].published+'</td>';
		//dta += '<td><div class="btn-toolbar"><div class="btn-group"><a class="btn" href="javascript:preEdit(\''+result[i].id+'\', \'presentation\')"><i class="icon-pencil"></i></a></div></div></td></tr>';
		//dta += '</div></div></td></tr>';
	  }
	  $('#liData').html(dta);
	});
}