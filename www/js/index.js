$(document).ready(function () {

    $('#toHome').click(function(){
        $('.page').css('display','none');
        $('#home').css('display','inline');
        $('.button-collapse').sideNav('hide');
        $('#page-title').text("Home");
    });
    $('#toAbout').click(function(){
        $('.page').css('display','none');
        $('#about').css('display','inline');
        $('.button-collapse').sideNav('hide');
        $('#page-title').text("About");
    });
    $('#toSearch').click(function(){
        $('.page').css('display','none');
        $('#search').css('display','inline');
        $('.button-collapse').sideNav('hide');
        $('#page-title').text("Search");
    });
    $('#toSaved').click(function(){
        $('.page').css('display','none');
        $('#saved').css('display','inline');
        $('.button-collapse').sideNav('hide');
        $('#page-title').text("Cookbook");
    });
    $('#toEdit').click(function(){
        $('.page').css('display','none');
        $('#edit').css('display','inline');
        $('.button-collapse').sideNav('hide');
        $('#page-title').text("Edit");
    });
    $('#toSettings').click(function(){
        $('.page').css('display','none');
        $('#settings').css('display','inline');
        $('.button-collapse').sideNav('hide');
        $('#page-title').text("Settings");
    });
    $('#toList').click(function(){
        $('.page').css('display','none');
        $('#list').css('display','inline');
        $('.button-collapse').sideNav('hide');
        $('#page-title').text("Shopping List");
    });
    $('#toLogin').click(function(){
        $('.page').css('display','none');
        $('#startUp').css('display','none');
        $('#login').css('display','inline');
        $('.button-collapse').sideNav('hide');
    });

    $('#toSignUp').click(function(){
        $('.page').css('display','none');
        $('#startUp').css('display','none');
        $('#signUp').css('display','inline');
        $('.button-collapse').sideNav('hide');
    });
    $('#toStartUp').click(function(){
        $('.page').css('display','none');
        $('#startUp').css('display','inline');
    });
    $('#toStartUpSignUp').click(function(){
        $('#signUp').css('display','none');
        $('#startUp').css('display','inline');
    });
    $('#toRecipe').click(function(){
        $('.page').css('display','none');
        $('#recipe').css('display','inline');
        $('.button-collapse').sideNav('hide');
    });
    $('#toAddRecipe').click(function(){
        $('.page').css('display','none');
        $('#addRecipe').css('display','inline');
        $('.button-collapse').sideNav('hide');
        $('#page-title').text("Add Recipe");
    });

    $('#navbarLogOut').click(function(){
        $('.button-collapse').sideNav('hide');
    })

    $('.button-collapse').sideNav({menuWidth: 240, activationWidth: 100});
    $('select').material_select();
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });



    $("#shopping-list-add-button").click(function () {
        var itemName = $("#shopping-list-add").val();
        $("<p><input type=\"checkbox\" /><label>"+itemName+"</label></p>").insertBefore("#item-submit")

    });

    $("#filter-by").on('change', function () {
        var filterValue = $("#filter-by").val();
        if (filterValue == 3) {
            $("#filter-by-ingredient-list").css("visibility", "visible");
            $("#filter-by-ingredient-list").css("display", "block");
        }
        else {
            $("#filter-by-ingredient-list").css("visibility", "hidden");
            $("#filter-by-ingredient-list").css("display", "none"); 
        };
    });
});
