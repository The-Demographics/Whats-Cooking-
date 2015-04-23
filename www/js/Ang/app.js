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
    window.resizeBy(1, 1);
    console.log("Logging in");
    ParseService.login($scope.login_username, $scope.login_password, function(user) {
      // When service call is finished, navigate to items page
      $('header').css('display','inline');
      $('footer').css('display','inline');
      $('.page').css('display','none');
      $('#home').css('display','inline');
      $('#page-title').text("Home");
      })
    $timeout( function(){
      ParseService.userDetails(function(results){
      $scope.$apply(function(){
        $scope.userDetails = results;
        console.log("Current user" + $scope.userDetails);
        })
      });
      ParseService.getMyRecipeBook(function(results){
      $scope.$apply(function() {
        $scope.myRecipes = results;
        var len = $scope.myRecipes.length;
        console.log(len);
        console.log($scope.myRecipes);
     })
    });
      $timeout(function() {
                var swiper = new Swiper('#swiper-1', {
            pagination: '#swiper-pagination-1',
            paginationClickable: true,
            loop: true,
            slidesPerView: 1
        });
    var swiper = new Swiper('#swiper-2', {
            pagination: '#swiper-pagination-2',
            paginationClickable: true,
            loop: true,
            slidesPerView: 1
        });
    var swiper = new Swiper('#swiper-3', {
            pagination: '#swiper-pagination-3',
            paginationClickable: true,
            loop: true,
            slidesPerView: 1
        });

  }, 100);
    }, 500);
}


  // Perform user signup using back-end service
  $scope.signUp = function() {
    ParseService.signUp($scope.signup_firstname, $scope.signup_lastname,$scope.signup_username, $scope.signup_email, $scope.signup_password, $scope.signup_confirmpassword, $scope.signup_age, $scope.profilePic, function(user) {
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
        console.log($scope.recipeList);

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
    /*$timeout( function(){
      ParseService.getBook($scope.myRecipes, function(results){
        $scope.$apply(function() {
          $scope.myRecipes = results;
      })
      })
    }, 200);*/
  }


  // Add a new Recipe record to Parse backend service
  $scope.addRecipe = function() {
    ParseService.addRecipe($scope.recipe_title,$scope.image, $scope.recipe_description, $scope.recipe_difficulty, $scope.recipe_preptime, $scope.recipe_theme, $scope.recipe_ing, $scope.recipe_method, $scope.recipe_vegetarian, function() {
    });
    $timeout( function(){
      ParseService.getRecipes(function(results) {
      $scope.$apply(function() {
        $scope.recipeList = results;
        var len = $scope.recipeList.length;
        console.log(len);
      });
    });
    }, 500);
  }

  $scope.search = function(){
    var term = $scope.search_term;
    var type = $scope.search_method;

    if (type == 1){
      ParseService.searchPrep($scope.search_term, function(results){
      $scope.$apply(function() {
        $scope.resultsList = results;
        var len = $scope.resultsList.length;
        console.log(len);
        console.log("Trying prep search");
        $('#SearchText').text("Recipes with prep times of " + term + " minutes or less");
    });
    })
    } else if (type == 2){
      ParseService.searchDifficulty($scope.search_term, function(results){
      $scope.$apply(function() {
        $scope.resultsList = results;
        console.log("Trying Dif search");
        var len = $scope.resultsList.length;
        console.log(len);
        $('#SearchText').text("Recipes with a difficulty level  of " + term + " or less");
    });
    })
  } else if (type == 3){
      ParseService.searchIng($scope.search_term, function(results){
      $scope.$apply(function() {
        console.log("Trying Ing search");
        $scope.resultsList = results;
        var len = $scope.resultsList.length;
        console.log(len);
        $('#SearchText').text("Recipes containing the ingredient" + term);
    });
    })
  } else {
    alert("Error");
  }

}


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
        console.log($scope.myRecipes);
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

  $scope.viewRecipe = function(){
    var name = this.recipe.get('Name');
    var img = this.recipe.get('Image');
    $scope.recipeName = name;
    $scope.recipeImg = img;
    console.log($scope.recipeImg);
    $('.page').css('display','none');
    $('#recipe').css('display','inline');
    $('#page-title').text(name);
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


  //adds image to web serive
  $scope.addProfilePic = function(){
    ParseService.addProfilePic(function(results){
      $scope.$apply(function(){
        $scope.profilePic = results;
        console.log("The scope image is" + $scope.profilePic);
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

  $scope.myRecipes = [];
  $scope.userDetails;
  $scope.discoverRecipeList = [];
  $scope.resultsList = [];
  $scope.discoverRecipes();
  $scope.recipeList = [];
  $scope.getRecipes();
  console.log("#Yolo");
  $scope.image;
  $scope.profilePic;

  //For recipe page
  $scope.recipeName;
  $scope.recipeImg;

}
MainCtrl.$inject = ['$scope', '$timeout','$location', 'ParseService']


