
/* Services */

angular.module('WhatsCookingappServices', ['ngResource'])
.factory('ParseService', function($resource){
    // Initialize Parse API and objects.
    Parse.initialize("yKtcMnRhdHbiATzIbmdJX9fDHvCwP4mVKjHhzoup", "KqcToLgLrdh9nMYQYm3xYYbVhFhSDQwgysUl7gxU");

    var loggedUser;

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
          callback(user);
         // getRecipes();
        loggedUser = user;

        },
        error: function(user, error) {
         alert("Error: " + error.message);
       }
     });
     },

     loggedIn : function loggedIn(){
      console.log(loggedUser);
     },

      // Register a user
      signUp : function signUp(username, password,callback) {
      	Parse.User.signUp(username, password,{ ACL: new Parse.ACL()}, {
          success: function(user) {
            callback(user);
          },

          error: function(user, error) {
            alert("Error: " + error.message);
          }
        });
      },

      // Create a new recipe
      addRecipe : function addRecipe(_title, _image, _description, _difficulty, _preptime, _theme, _method, _vegetarian, callback) {
        _vegetarian = document.getElementById('vegetarian').checked;
        _difficulty = Number(_difficulty);
        var Recipe = Parse.Object.extend("Recipes");
        var object = new Recipe();
        var Steps = [];
        Steps.push(_method);
        object.set("Name",_title);
        //object.set("Image", img);
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
        query.limit(5);
        query.find({
          success : function(results) {
            callback(results);
          },
          error: function(error) {
            alert("Error: " + error.message);
          }
        });
      },

      //Find User details
      userDetails : function userDetails(callback){
        var user = Parse.User.current();
        var Profile = Parse.Object.extend("User");
        var query = new Parse.Query(Profile);
        query.equalTo("User", user);
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

      //checks if user is logged in
      checkIfLoggedIn : function checkIfLoggedIn(){
        if(loggedUser == null){
         console.log("Its not working");
       }
     },

      // Get current logged in user
      getUser : function getUser() {
        if(loggedUser) {
          return loggedUser;
        }
      }

    };

    // The factory function returns ParseService, which is injected into controllers.
    return ParseService;
  });
