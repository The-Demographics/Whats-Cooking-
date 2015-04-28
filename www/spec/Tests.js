describe('MainCtrl', function() {
  beforeEach(module('WhatsCookingapp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.getRecipes', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('MainCtrl', { $scope: $scope });
    });

    it('Fetches recipes from the Parse database', function() {
      $scope.getRecipes();
      expect($scope.test2Passed).toEqual('True');
    });
  });

  describe('Recipes in discover', function() {
    it('Test to show only 5 recipes are shown in the discover tab', function() {

      // Verify that there are 5 tasks
      expect(element.all(by.repeater('recipe in discoverRecipeList')).count()).toEqual(10);
    });
  });

  describe('Login System', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('MainCtrl', { $scope: $scope });
    });

    it('Test to make sure that the current user is empty on initialise', function(){
      expect($scope.userDetails;).toEqual(null);
    });

    it('Test to make sure user login system works', function(){
      $scope.login_username = "User"
      $scope.login_password = "Pass"
      $scope.login();
      expect($scopetloginTestPassed).toEqual('True');
    })


  });


});