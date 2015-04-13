
/* Services */

angular.module('WhatsCookingappServices', ['ngResource'])
.factory('ParseService', function($resource){
    // Initialize Parse API and objects.
    Parse.initialize("yKtcMnRhdHbiATzIbmdJX9fDHvCwP4mVKjHhzoup", "KqcToLgLrdh9nMYQYm3xYYbVhFhSDQwgysUl7gxU");

    // Cache current logged in user
    var loggedInUser;

    // Cache list of user's recipes
    var myBooks = [];

    // Define parse model and collection for Recipe records
    var Recipe = Parse.Object.extend("Recipes");
    var RecipeCollection = Parse.Collection.extend({ model:Recipe });

    var ParseService = {
      name: "Parse",

      // Login a user
      login : function login(username, password, callback) {
    	  Parse.User.logIn(username, password, {
    	    success: function(user) {
            loggedInUser = user;
    	      callback(user);
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
                loggedInUser = user;
                callback(user);
            },

            error: function(user, error) {
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
        if(loggedInUser) {
          return loggedInUser;
        }
      }
    
    };

    // The factory function returns ParseService, which is injected into controllers.
    return ParseService;
});
