angular.module('WhatsCookingapp', ['WhatsCookingappServices'])
.controller('MainCtrl',MainCtrl)


/* Controllers */


/**
 * Main controller for the app
 */
function MainCtrl($scope, $timeout, $location, ParseService) {
  $scope.init = function() {
    $scope.user = ParseService.getUser();
  }

  $scope.login = function() {
    ParseService.login($scope.login_username, $scope.login_password, function(user) {
      // When service call is finished, navigate to items page
      $('header').css('display','inline');
      $('footer').css('display','inline');
      $('.page').css('display','none');
      $('#home').css('display','inline');
      })
    $timeout( function(){
      ParseService.userDetails(function(results){
      $scope.$apply(function(){
        $scope.userDetails = results;
        var len = $scope.userDetails.length;
        console.log("This should equel one ... " +len);
      })
    })
    }, 500);
  }

  // Perform user signup using back-end service
  $scope.signUp = function() {
    ParseService.signUp($scope.signup_username, $scope.signup_password, function(user) {
      // When service call is finished, navigate to items page
      $('.page').css('display','none');
      $('#login').css('display','inline');
    });
  }

  $scope.loggedIn = function(){
    ParseService.loggedIn();
  }

  // Fetch the list of Recipes from the backend service
  $scope.getRecipes = function() {
    ParseService.getRecipes(function(results) {
      $scope.$apply(function() {
        $scope.recipeList = results;
        var len = $scope.recipeList.length;
        console.log(len);

      });
    });
  }

  // Fetch 10 Recipes from the backend service for the discover page
  $scope.discoverRecipes = function() {
    ParseService.discoverRecipes(function(results) {
      $scope.$apply(function() {
        $scope.discoverRecipeList = results;
        var len = $scope.discoverRecipeList.length;
        console.log(len);
      });
    });
  }

  // Fetch the CookBookRecipes from the backend service
  $scope.getMyRecipes = function() {
    ParseService.getMyRecipes(function(results) {
      $scope.$apply(function() {
        $scope.myRecipes = results;
      })
    });
  }


  // Add a new Recipe record to Parse backend service
  $scope.addRecipe = function() {
    ParseService.addRecipe($scope.recipe_title,$scope.image, $scope.recipe_description, $scope.recipe_difficulty, $scope.recipe_preptime, $scope.recipe_theme, $scope.recipe_method, $scope.recipe_vegetarian, function() {
    });
  }



  //Finds Current User
  $scope.getUser = function(){
    ParseService.getUser();
  }

  //Find current User Details
  $scope.userDetails = function(){
    ParseService.userDetails(function(results){
      $scope.$apply(function(){
        $scope.userDetails = results;
      })
    });
  }

  //adds image to web serive
  $scope.addImage = function(){
    ParseService.addImage(function(results){
      $scope.$apply(function(){
        $scope.image = results;
        console.log("The scope image is" + $scope.image);
      })
    })
  }


  $scope.checkIfLoggedIn = function(){
    ParseService.checkIfLoggedIn();
  }

  // logs the user out and re-direct to login page
  $scope.logout = function() {
    ParseService.logout();
    $('header').css('display','inline');
    $('footer').css('display','inline');
    $('.page').css('display','none');
    $('#startUp').css('display','none');
  }

  /**
   * On startup...
   */

  $scope.userDetails = [];
  $scope.discoverRecipeList = [];
  $scope.discoverRecipes();
  $scope.recipeList = [];
  $scope.getRecipes();
  $scope.myRecipes = [];
  console.log("#Yolo");
  $scope.checkIfLoggedIn();
  $scope.image;
}
MainCtrl.$inject = ['$scope', '$timeout','$location', 'ParseService']


