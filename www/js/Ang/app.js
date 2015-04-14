angular.module('WhatsCookingapp', ['WhatsCookingappServices','ngRoute'])
.controller('LoginCtrl',LoginCtrl).controller('MainCtrl',MainCtrl);

/* Controllers */

/**
 * Login controller for the app
 */
function LoginCtrl($scope, $location, ParseService) {
  // Perform user login using back-end service
	$scope.login = function() {
		ParseService.login($scope.login_username, $scope.login_password, function(user) {
      // When service call is finished, navigate to items page
      window.location.href = 'index.html';
    });
	}

  // Perform user signup using back-end service
	$scope.signUp = function() {
		ParseService.signUp($scope.signup_username, $scope.signup_password, function(user) {
      // When service call is finished, navigate to items page
      window.location.href = 'login.html';
    });
	}
}
LoginCtrl.$inject = ['$scope', '$location', 'ParseService']

/**
 * Main controller for the app
 */
function MainCtrl($scope, $location, ParseService) {
  $scope.init = function() {
    $scope.user = ParseService.getUser();
  }

  // Fetch the list of Recipes from the backend service
  $scope.getRecipes = function() {
    ParseService.getRecipes(function(results) {
      $scope.$apply(function() {
        $scope.recipeList = results;
<<<<<<< HEAD
=======
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
>>>>>>> origin/Tom
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
<<<<<<< HEAD
    ParseService.addRecipe($scope.recipe_title, $scope.recipe_description, $scope.recipe_difficulty, $scope.recipe_preptime, $scope.recipe_theme, $scope.recipe_method, $scope.recipe_vegetarian, function() {
=======
    ParseService.addRecipe($scope.recipe_title, $scope.recipe_image, $scope.recipe_description, $scope.recipe_difficulty, $scope.recipe_preptime, $scope.recipe_theme, $scope.recipe_method, $scope.recipe_vegetarian, function() {
>>>>>>> origin/Tom
      window.location.href = "index.html";
    });
  }

<<<<<<< HEAD
=======


>>>>>>> origin/Tom
  // logs the user out and re-direct to login page
  $scope.logout = function() {
    ParseService.logout();
    window.location.href ='/login';
  }

  /**
   * On startup...
   */
<<<<<<< HEAD
  $scope.recipeList = [];
  $scope.myRecipes = [];
  $scope.init();
  $scope.getRecipes();
  //$scope.getMyRecipes();
=======

  $scope.discoverRecipeList = [];
  $scope.discoverRecipes();
  $scope.recipeList = [];
  $scope.getRecipes();
  $scope.myRecipes = [];
  $scope.init();
  console.log("#Yolo");
>>>>>>> origin/Tom
}
MainCtrl.$inject = ['$scope', '$location', 'ParseService']

