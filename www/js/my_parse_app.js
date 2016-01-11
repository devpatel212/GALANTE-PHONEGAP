function signUpUser() {
        		
        	// TODO: Enter in your own API keys
	        Parse.initialize("6fhBGovd4GFjgixpVQIl4PyTJKwJM7uHUP3XYLlj", "2NirEVI4f2LBQZiMnulp0fD7T5hOhXQg0Upw0CPD");
	        		        	       	
	        var user = new Parse.User();

	        var username = $("#signup-username").val();
	        var email = $("#signup-email").val();
	        var password = $("#signup-password").val();
	        var school = $("#signup-school").val();

	        user.set("username", username);
			user.set("password", password);
			user.set("email", email);

	        user.signUp(null, {
		        success: function(user) {
			        
			        var currentUser = Parse.User.current();  
			        	if(currentUser) {
	  					window.location.href="home-nointro.html";
  					}  
			     },
			    error: function(user, error) {
				    alert("Error: " + error.code + " " + error.message);
				}
		});
}

function signInUser() {

        	// TODO: Enter in your own API keys
	        Parse.initialize("6fhBGovd4GFjgixpVQIl4PyTJKwJM7uHUP3XYLlj", "2NirEVI4f2LBQZiMnulp0fD7T5hOhXQg0Upw0CPD");

			var username = $("#signin-username").val();
			var password = $("#signin-password").val();

			Parse.User.logIn(username, password, {
  				success: function(user) {
  					
  					var currentUser = Parse.User.current();
  					if(currentUser) {
	  					window.location.href="home-nointro.html";
  					}  
  				},
 				 error: function(user, error) {
 				 	alert("Error: " + error.code + " " + error.message);
			 	}
		});
}


 