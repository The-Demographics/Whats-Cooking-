
/* Services */

angular.module('WhatsCookingappServices', ['ngResource'])
.factory('ParseService', function($resource){
    // Initialize Parse API and objects.
    Parse.initialize("yKtcMnRhdHbiATzIbmdJX9fDHvCwP4mVKjHhzoup", "KqcToLgLrdh9nMYQYm3xYYbVhFhSDQwgysUl7gxU");

    // Cache current logged in user
    var currentUser;

    // Cache list of user's recipes
    var myRecipes = [];

    // Define parse model and collection for Recipe records
    var Recipe = Parse.Object.extend("Recipes");
    var RecipeCollection = Parse.Collection.extend({ model:Recipe });

    var ParseService = {
      name: "Parse",

      // Login a user
      login : function login(username, password, callback) {
    	  Parse.User.logIn(username, password, {
    	    success: function(user) {
            currentUser = Parse.User.current();
    	      callback(user);
<<<<<<< HEAD
=======
            getRecipes();

>>>>>>> origin/Tom
    	    },
    	    error: function(user, error) {
    	      alert("Error: " + error.message);
    	    }
        });
      },

      // Register a user
      signUp : function signUp(username, password,callback) {
      	Parse.User.signUp(username, password,{ ACL: new Parse.ACL()}, {
            success: function(user) {
<<<<<<< HEAD
                loggedInUser = user;
=======
                currentUser = user;
>>>>>>> origin/Tom
                callback(user);
            },

            error: function(user, error) {
              alert("Error: " + error.message);
            }
        });
      },

      // Create a new recipe
<<<<<<< HEAD
      addRecipe : function addRecipe(_title, _description, _difficulty, _preptime, _theme, _method, _vegetarian, callback) {
=======
      addRecipe : function addRecipe(_title, _image, _description, _difficulty, _preptime, _theme, _method, _vegetarian, callback) {
>>>>>>> origin/Tom
        _vegetarian = document.getElementById('vegetarian').checked;
        _difficulty = Number(_difficulty);
        var Recipe = Parse.Object.extend("Recipes");
        var object = new Recipe();
        var Steps = [];
        Steps.push(_method);
        object.set("Name",_title);
<<<<<<< HEAD
=======
        //object.set("Image", img);
>>>>>>> origin/Tom
        object.set("Description",_description);
        //object.set("AddedBy", currentUser);
        object.set("Difficulty",_difficulty);
        object.set("PrepTime",_preptime);
        object.set("Theme",_theme);
        object.set("Method",Steps);
        object.set("Vegetarian",_vegetarian);
        object.save( null, {
          success: function(object) {
            callback();
            alert("success");
          },
          error: function(error) {
            alert("Error: " + error.message);
            alert("Failure");
          }
        });
<<<<<<< HEAD
      },

      getBooks : function getRecipes(callback) {
        var query = new Parse.Query(Book);
        // use the find method to retrieve all public recipes
=======


      },

      getRecipes : function getRecipes(callback) {
        var query = new Parse.Query(Recipe);
        // use the find method to retrieve all public recipes
        query.find({
          success : function(results) {
            callback(results);
            console.log("I've ran");
            for (var i = 0; i < results.length; i++){
              var object = results[i];
              console.log(object.get('Name'));
            }
          },
          error: function(error) {
            alert("Error: " + error.message);
          }
        });
      },

      discoverRecipes : function discoverRecipes(callback) {
        var query = new Parse.Query(Recipe);
        // use the find method to retrieve all public recipes
        query.limit(10);
>>>>>>> origin/Tom
        query.find({
          success : function(results) {
            callback(results);
          },
          error: function(error) {
            alert("Error: " + error.message);
          }
        });
      },

      // Logout current user
      logout : function logout(callback) {
        Parse.User.logOut();
      },

      // Get current logged in user
      getUser : function getUser() {
<<<<<<< HEAD
        if(loggedInUser) {
          return loggedInUser;
=======
        if(currentUser) {
          return currentUser;
>>>>>>> origin/Tom
        }
      }
    
    };

    // The factory function returns ParseService, which is injected into controllers.
    return ParseService;
});
