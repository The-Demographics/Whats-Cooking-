angular.module('WhatsCookingapp', ['WhatsCookingappServices'])
.controller('MainCtrl',MainCtrl)




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
      $scope.loginTestPassed = "True";
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
        $scope.test2Passed = "True";
      });
    });
  }

  // Fetch 5 Recipes from the backend service for the discover page
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
        $scope.testSearchType ="Prep Time";
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
        $scope.testSearchType ="Difficulty";
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
        $scope.testSearchType ="Ingredients";
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
    var theme = this.recipe.get('Theme');
    var prep = this.recipe.get('PrepTime');
    var veg = this.recipe.get('Vegetarian');
    var dif = this.recipe.get('Difficulty');
    var Ingredients = this.recipe.get('Ingredients');
    var ing = Ingredients[0];
    var Method = this.recipe.get('Method');
    var ins = Method[0];
    $scope.recipeName = name;
    $scope.recipeImg = img;
    $scope.recipeIng = ing;
    $scope.recipeIns = ins;
    $scope.recipeVeg = veg;
    $scope.recipePrep = prep;
    $scope.recipeDif = dif;
    $scope.recipeTheme = theme;
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

  //For Testing
  $scope.test2Passed;
  $scope.loginTestPassed;
  $scope.testSearchType;

  //For recipe page
  $scope.recipeName;
  $scope.recipeImg;
  $scope.recipeIng;
  $scope.recipeIns;
  $scope.recipeVeg;
  $scope.recipePrep
  $scope.recipeDif;
  $scope.recipeTheme;

}
MainCtrl.$inject = ['$scope', '$timeout','$location', 'ParseService']


