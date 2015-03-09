Parse.initialize("yKtcMnRhdHbiATzIbmdJX9fDHvCwP4mVKjHhzoup", "KqcToLgLrdh9nMYQYm3xYYbVhFhSDQwgysUl7gxU");
var currentUser;

$("#signup").click(function(){
	signUp();
});
$('#login').click(function(){
	logIn();
});

function signUp(){
	var firstname = $('#firstname').val();
	var lastname = $('#lastname').val();
	var username = $('#username').val();
	var password = $('#password').val();
	var email = $('#email').val();
	var vegi = document.getElementById("vegetarian").checked;
	var age = $('#age').val();
	var setage = Number(age);
	console.log(vegi);
	var user = new Parse.User();
	user.set("firstname", firstname);
	user.set("lastname", lastname);
	user.set("username", username);
	user.set("password", password);
	user.set("email", email);
	user.set("vegetarian", vegi);
	user.set("age", setage);

	user.signUp(null, {
		success: function(user) {
			alert("Thank You for signing up")
		},
		error: function(user, error) {
	      	// Show the error message somewhere and let the user try again.
	      	alert("Error: " + error.code + " " + error.message);
     	}
	});
}

function logIn(){
  var username = $('#username-login').val();
  var password = $('#password-login').val();
  Parse.User.logIn(username, password, {
    success: function(user) {
      currentUser = Parse.User.current();
      alert("You have logged in you #Legend");
    },
    error: function(user, error) {
      alert("Incorrect username or password");
    }
  });
}

function logOut(){
  Parse.User.logOut();
}