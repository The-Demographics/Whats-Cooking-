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
    ParseService.addRecipe($scope.recipe_title, $scope.recipe_description, $scope.recipe_difficulty, $scope.recipe_preptime, $scope.recipe_theme, $scope.recipe_method, $scope.recipe_vegetarian, function() {
      window.location.href = "index.html";
    });
  }

  // logs the user out and re-direct to login page
  $scope.logout = function() {
    ParseService.logout();
    window.location.href ='/login';
  }

  /**
   * On startup...
   */
  $scope.recipeList = [];
  $scope.myRecipes = [];
  $scope.init();
  $scope.getRecipes();
  //$scope.getMyRecipes();
}
MainCtrl.$inject = ['$scope', '$location', 'ParseService']

