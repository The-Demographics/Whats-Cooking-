/* Services */
var imgdata;
var cameraimg;
var file;

$('#fileselect').bind("change", function(e) {
    var files = e.target.files || e.dataTransfer.files;
    file = files[0];
});

var input = document.querySelector('input[type=file]');
input.onchange = function() {
    file = input.files[0];
};

var imgdataProfile;
var cameraimgProfile;
var file2;

$('#fileselect').bind("change", function(e) {
    var files = e.target.files || e.dataTransfer.files;

    file2 = files[0];
});

var input = document.querySelector('input[type=file]');
input.onchange = function() {
    file2 = input.files[0];
};


angular.module('WhatsCookingappServices', ['ngResource'])
    .factory('ParseService', function($resource) {
            // Initialize Parse API 
            Parse.initialize("yKtcMnRhdHbiATzIbmdJX9fDHvCwP4mVKjHhzoup", "KqcToLgLrdh9nMYQYm3xYYbVhFhSDQwgysUl7gxU");

            var loggedUser;


            var myRecipes = [];

            // Define parse model and collection for Recipe records
            var Recipe = Parse.Object.extend("Recipes");
            var RecipeCollection = Parse.Collection.extend({
                model: Recipe
            });

            var ParseService = {
                name: "Parse",

                // Login a user
                login: function login(username, password, callback) {
                    Parse.User.logIn(username, password, {
                        success: function(user) {
                            callback(user);
                            loggedUser = user;

                        },
                        error: function(user, error) {
                            //alert("Error: " + error.message);
                            Materialize.toast("Error: " + error.message , 4000);
                        }
                    });
                },

                loggedIn: function loggedIn() {
                    console.log(loggedUser);
                },

                // Register a user
                signUp: function signUp(first, last, username, email, password, confirm, age, pic, callback) {

                    if (password == confirm) {
                        var user = new Parse.User();
                        var age = Number(age);

                        user.set("username", username);
                        user.set("password", password);
                        user.set("ProfilePic", pic);
                        user.set("firstname", first);
                        user.set("lastname", last);
                        user.set("email", email);
                        user.set("age", age);


                        user.signUp(null, {
                            success: function(user) {
                                Materialize.toast("Thank you for signing up ", 2000);
                                $('.page').css('display','none');
                                $('#login').css('display','inline');
                            },
                            error: function(user, error) {

                                Materialize.toast("Error: " + error.code + " " + error.message , 4000);
                            }
                        });
                    } else {
                        alert("Passwords do not match");
                    }
                },

                // Create a new recipe
                addRecipe: function addRecipe(_title, _image, _description, _difficulty, _preptime, _theme, _ing, _method, _vegetarian, callback) {
                    _vegetarian = document.getElementById('vegetarian').checked;
                    _difficulty = Number(_difficulty);
                    _preptime = Number(_preptime);
                    var Ingredients = [];
                    Ingredients.push(_ing);
                    var method = [];
                    method.push(_method);
                    var user = Parse.User.current();
                    var object = new Recipe();
                    object.set("Name", _title);
                    object.set("Description", _description);
                    object.set("Image", _image);
                    object.set("Difficulty", _difficulty);
                    object.set("PrepTime", _preptime);
                    object.set("Theme", _theme);
                    object.set("Ingredients", Ingredients);
                    object.set("Method", method);
                    object.set("Vegetarian", _vegetarian);


                    object.save(null, {
                        success: function(object) {
                            Materialize.toast("Thank you for adding your recipe. ", 2000);

                        },
                        error: function(object, error) {
                            Materialize.toast(error.message, 2000);
                        }
                    });
                },

                getRecipes: function getRecipes(callback) {
                    var query = new Parse.Query(Recipe);
                    // use the find method to retrieve all public recipes
                    query.find({
                        success: function(results) {
                            callback(results);
                        },
                        error: function(error) {
                            alert("Error: " + error.message);
                        }
                    });
                },


                searchPrep: function searchPrep(_term, callback) {
                    console.log("Trying prep time search");
                    var term = Number(_term);
                    var query = new Parse.Query(Recipe);
                    query.lessThanOrEqualTo("PrepTime", term);
                    query.find({
                        success: function(results) {
                            callback(results);
                            console.log("Prep time success")
                        },
                        error: function(error) {
                            alert("Error: " + error.message);
                        }
                    });
                },

                searchDifficulty: function searchDifficulty(_term, callback) {
                    console.log("Trying Difficulty search");
                    var term = Number(_term);
                    if (term > 5) {
                        alert("Value too high");
                    } else {
                        console.log("Trying Difficulty search");
                        var query = new Parse.Query(Recipe);
                        query.lessThanOrEqualTo("Difficulty", term);
                        query.find({
                            success: function(results) {
                                console.log("Difficulty success");
                                callback(results);
                            },
                            error: function(error) {
                                alert("Error: " + error.message);
                            }
                        });
                    };
                },

                searchIng: function searchIng(_term, callback) {
                    console.log("Trying Ingredients search");
                    var query = new Parse.Query(Recipe);
                    query.equalTo("Ingredients", _term);
                    query.find({
                        success: function(results) {
                            callback(results);
                            console.log("Trying Ingredients search success");
                        },
                        error: function(error) {
                            alert("Error: " + error.message);
                        }
                    });
                },

                addToBook: function addToBook(_recipe, callback) {
                    var User = Parse.Object.extend("User");
                    var query = new Parse.Query(User);
                    var theuser = Parse.User.current().id;
                    var sendName = String(_recipe);
                    query.equalTo("objectId", theuser);
                    query.first({
                        success: function(User) {
                            User.save(null, {
                                success: function(user) {
                                    user.addUnique("recipeList", sendName);
                                    user.save();
                                }
                            });

                        }
                    });

                },

              getMyRecipeBook : function getMyRecipeBook(callback){
              var callbackList = [];
              var User = Parse.Object.extend("User");
              var query = new Parse.Query(User);
              var theuser = Parse.User.current().id;
              query.equalTo("objectId", theuser);
              query.first({
                success: function(user){
                  var recipeList = user.get('recipeList');
                    var query2 = new Parse.Query(Recipe);
                    query2.containedIn("Name", recipeList);
                    query2.find({
                    success: function(results) {
                        callback(results);
                    },
                    error: function(error) {
                        alert("Error: " + error.message);
                    }
                });
                
                }
              })
            },

               


            discoverRecipes : function discoverRecipes(callback) {
                    var query = new Parse.Query(Recipe);
                    // use the find method to retrieve all public recipes
                    query.limit(5);
                    query.find({
                        success: function(results) {
                            callback(results);
                        },
                        error: function(error) {
                            alert("Error: " + error.message);
                        }
                    });
                },

                //Find User details
                userDetails: function userDetails(callback) {
                    var user = Parse.User.current().id;
                    console.log("Getting user deails with ID:" + user);
                    var Profile = Parse.Object.extend("User");
                    var query = new Parse.Query(Profile);
                    query.equalTo("objectId", user);
                    query.first({
                        success: function(results) {
                            callback(results);
                            console.log("Found user details");
                        },
                        error: function(error) {
                            alert("Error: " + error.message);
                        }
                    });
                },

                //Send image to web service
                addImage: function addImage(callback) {

                    // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
                    var serverUrl = 'https://api.parse.com/1/files/' + file.name;

                    $.ajax({
                        type: "POST",
                        beforeSend: function(request) {
                            request.setRequestHeader("X-Parse-Application-Id", 'yKtcMnRhdHbiATzIbmdJX9fDHvCwP4mVKjHhzoup');
                            request.setRequestHeader("X-Parse-REST-API-Key", 'edbOSElqeLfVn9pacN9YscGOXGE2M7DHqV8iBXBD');
                            request.setRequestHeader("Content-Type", file.type);
                        },
                        url: serverUrl,
                        data: file,
                        processData: false,
                        contentType: false,
                        success: function(data) {
                            imgdata = data.url;
                            imgdata = JSON.stringify(imgdata);
                            console.log(imgdata + "Is the Link");
                            console.log("Added");
                            callback(imgdata);
                        },
                        error: function(data) {
                            var obj = jQuery.parseJSON(data);
                            alert(obj.error);
                        }
                    });
                },

                //Send image to web service
                addProfilePic: function addProfilePic(callback) {

                    // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
                    var serverUrl = 'https://api.parse.com/1/files/' + file2.name;

                    $.ajax({
                        type: "POST",
                        beforeSend: function(request) {
                            request.setRequestHeader("X-Parse-Application-Id", 'yKtcMnRhdHbiATzIbmdJX9fDHvCwP4mVKjHhzoup');
                            request.setRequestHeader("X-Parse-REST-API-Key", 'edbOSElqeLfVn9pacN9YscGOXGE2M7DHqV8iBXBD');
                            request.setRequestHeader("Content-Type", file2.type);
                        },
                        url: serverUrl,
                        data: file2,
                        processData: false,
                        contentType: false,
                        success: function(data) {
                            imgdataProfile = data.url;
                            imgdataProfile = JSON.stringify(imgdataProfile);
                            console.log(imgdataProfile + "Is the Link");
                            console.log("Added");
                            callback(imgdataProfile);
                        },
                        error: function(data) {
                            var obj = jQuery.parseJSON(data);
                            alert(obj.error);
                        }
                    });
                },

                // Logout current user
                logout: function logout(callback) {
                    Parse.User.logOut();
                },

                //checks if user is logged in
                checkIfLoggedIn: function checkIfLoggedIn() {
                    if (loggedUser == null) {
                        console.log("Its not working");
                    }
                },

                // Get current logged in user
                getUser: function getUser() {
                    if (loggedUser) {
                        return loggedUser;
                    }
                }

        };
        return ParseService;
    });
