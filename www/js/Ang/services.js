/* Services */
var imgdata;
var cameraimg;
var file;
// Set an event listener on the Choose File field.
$('#fileselect').bind("change", function(e) {
    var files = e.target.files || e.dataTransfer.files;
    // Our file var now holds the selected file
    file = files[0];
});
// Set an event listener on the Choose File field.
var input = document.querySelector('input[type=file]');
input.onchange = function() {
    file = input.files[0];
};
angular.module('WhatsCookingappServices', ['ngResource'])
    .factory('ParseService', function($resource) {
        // Initialize Parse API and objects.
        Parse.initialize("yKtcMnRhdHbiATzIbmdJX9fDHvCwP4mVKjHhzoup", "KqcToLgLrdh9nMYQYm3xYYbVhFhSDQwgysUl7gxU");

        var loggedUser;

        // Cache list of user's recipes
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
                        // getRecipes();
                        loggedUser = user;

                    },
                    error: function(user, error) {
                        alert("Error: " + error.message);
                    }
                });
            },

            loggedIn: function loggedIn() {
                console.log(loggedUser);
            },

            // Register a user
            signUp: function signUp(username, password, callback) {
                Parse.User.signUp(username, password, {
                    ACL: new Parse.ACL()
                }, {
                    success: function(user) {
                        callback(user);
                    },

                    error: function(user, error) {
                        alert("Error: " + error.message);
                    }
                });
            },

            // Create a new recipe
            addRecipe: function addRecipe(_title, _image, _description, _difficulty, _preptime, _theme, _method, _vegetarian, callback) {
                _vegetarian = document.getElementById('vegetarian').checked;
                _difficulty = Number(_difficulty);
                var Recipe = Parse.Object.extend("Recipes");
                var object = new Recipe();
                var Steps = [];
                Steps.push(_method);
                object.set("Name", _title);
                object.set("Image", _image);
                object.set("Description", _description);
                //object.set("AddedBy", currentUser);
                object.set("Difficulty", _difficulty);
                object.set("PrepTime", _preptime);
                object.set("Theme", _theme);
                object.set("Method", Steps);
                object.set("Vegetarian", _vegetarian);
                object.save(null, {
                    success: function(object) {
                        alert("success");
                    },
                    error: function(error) {
                        alert("Error: " + error.message);
                        alert("Failure");
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

            /*search: function search(_term, _method, callback) {
                switch (_method) {
                    case 1:
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
                        break;
                    case 2:
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
                        break;
                    case 3:
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
                        break;
                    default:
                        console.log("Error");
                } //End of switch
            },*/

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

            addToBook: function addToBook(_recipe, callback){
              var User = Parse.Object.extend("User");
              var query = new Parse.Query(User);
              var theuser = Parse.User.current().id;
              var sendName = String(_recipe);
              query.equalTo("objectId", theuser);
              query.first({
                success: function (User){
                  User.save(null,{
                    success: function (user){
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
                  for (var i = 0; i < recipeList.length; i++){
                    var query2 = new Parse.Query(Recipe);
                    query.equalTo("Name", [i]);
                    query2.find({
                    success: function(results) {
                        callbackList.push(results);
                        var len = callbackList.length;
                        console.log(len)
                        callback(callbackList);
                    },
                    error: function(error) {
                        alert("Error: " + error.message);
                    }
                });
                  }
                }
              })
            },

            



                discoverRecipes: function discoverRecipes(callback) {
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
                query.find({
                    success: function(results) {
                        callback(results);
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

        // The factory function returns ParseService, which is injected into controllers.
        return ParseService;
    });
