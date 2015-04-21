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
      });
      ParseService.getMyRecipeBook(function(results){
      $scope.$apply(function() {
        $scope.myRecipes = results;
        var len = $scope.myRecipes.length;
        console.log(len);
     })
    });
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

  /*$scope.search = function(){
    ParseService.search($scope.search_term, $scope.search_method,function(results) {
      $scope.$apply(function() {
        $scope.resultsList = results;
        var len = $scope.resultsList.length;
        console.log(len);
    });
    });
  } */

  $scope.searchPrep = function(){
    console.log("Trying prep search");
    ParseService.searchPrep($scope.search_term, function(results){
      $scope.$apply(function() {
        $scope.resultsList = results;
        var len = $scope.resultsList.length;
        console.log(len);
        console.log("Trying prep search");
    });
    })
  }

  $scope.searchDifficulty = function(){
    console.log("Trying Difficulty search");
    ParseService.searchDifficulty($scope.search_term, function(results){
      $scope.$apply(function() {
        $scope.resultsList = results;
        console.log("Trying Dif search");
        var len = $scope.resultsList.length;
        console.log(len);
    });
    })
  }

  $scope.searchIng = function(){
    console.log("Trying Ing search");
    ParseService.searchIng($scope.search_term, function(results){
      $scope.$apply(function() {
        console.log("Trying Ing search");
        $scope.resultsList = results;
        var len = $scope.resultsList.length;
        console.log(len);
    });
    })
  }

  $scope.getMyRecipeBook = function(){
    console.log("Fetching recipe book");
    ParseService.getMyRecipeBook(function(results){
      $scope.$apply(function() {
        $scope.myRecipes = results;
        var len = $scope.myRecipes.length;
        console.log(len);
    });
    })
  }

  $scope.myRecipeLength = function(){
     var len = $scope.myRecipes.length;
     console.log(len);
  }

  $scope.addToBook = function(){
    var name = this.recipe.get('Name');
    console.log(name);
    ParseService.addToBook(name, function(){
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
    $('header').css('display','none');
    $('footer').css('display','none');
    $('.page').css('display','none');
    $('#startUp').css('display','inline');
  }

  /**
   * On startup...
   */

  $scope.userDetails = [];
  $scope.discoverRecipeList = [];
  $scope.resultsList = [];
  $scope.discoverRecipes();
  $scope.recipeList = [];
  $scope.getRecipes();
  $scope.myRecipes = [];
  console.log("#Yolo");
  $scope.checkIfLoggedIn();
  $scope.image;
}
MainCtrl.$inject = ['$scope', '$timeout','$location', 'ParseService']


