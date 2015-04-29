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
        //var list = $("#shopping-list-form");
        $("<p><input type=\"checkbox\" /><label>"+itemName+"</label></p>").insertBefore("#item-submit")

        //("<p><input type=\"checkbox\" /><label>"+itemName+"</label></p>");
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
/*
var imgdata;
var cameraimg;
var file;

$(function() {
    var file;


     // Set an event listener on the Choose File field.
    $('#fileselect').bind("change", function(e) {
        var files = e.target.files || e.dataTransfer.files;
        // Our file var now holds the selected file
        file = files[0];
    });

    // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
    $('#addRecipe').click(function() {
        var serverUrl = 'https://api.parse.com/1/files/' + file.name;

        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("X-Parse-Application-Id", 'yKtcMnRhdHbiATzIbmdJX9fDHvCwP4mVKjHhzoup');
                request.setRequestHeader("X-Parse-REST-API-Key", 'edbOSElqeLfVn9pacN9YscGOXGE2M7DHqV8iBXBD');
                request.setRequestHeader("Content-Type", file.type);
            },
            url: serverUrl,
            data: file,
            processData: false,
            contentType: false,
            success: function(data) {
                console.log("File available at: " + data.url);
                imgdata = data.url;
                imgdata = JSON.stringify(imgdata);
                console.log(imgdata + "Is the Link");
                window.open(imgdata);
                return(imgdata);
               // sendProfilePicture();
            },
            error: function(data) {
                var obj = jQuery.parseJSON(data);
                alert(obj.error);
            }
        });
    });

});

function sendProfilePicture() {
    var user = Parse.User.current();
    var ProfilePic = Parse.Object.extend("ProfilePicture");
    var profilepic = new ProfilePic();
    profilepic.set("User", user);

    profilepic.save(null, {
        success: function(profilepic) {
            profilepic.set("Link", imgdata);
            profilepic.save();
            displayProfilePicture();
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function displayProfilePicture() {
    var user = Parse.User.current();
    var profilepic = Parse.Object.extend("ProfilePicture");
    var query = new Parse.Query(profilepic);
    query.equalTo("User", user);
    query.find({
        success: querySuccess,
        error: error
    });

    function querySuccess(profilepic) {
        for (var i = 0; i < profilepic.length; i++) {
          $('#profilePic').html("<img id='image' src=" + profilepic[i].get('Link') + ">");
        }
    }

    function error(error) {
        alert("Error: " + error.code + " " + error.message);
    }
}


function imgToParse(file){
    
    var serverUrl = 'https://api.parse.com/1/files/' + file.name;

        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("X-Parse-Application-Id", 'yKtcMnRhdHbiATzIbmdJX9fDHvCwP4mVKjHhzoup');
                request.setRequestHeader("X-Parse-REST-API-Key", 'edbOSElqeLfVn9pacN9YscGOXGE2M7DHqV8iBXBD');
                request.setRequestHeader("Content-Type", file.type);
            },
            url: serverUrl,
            data: file,
            processData: false,
            contentType: false,
            success: function(data) {
                console.log("File available at: " + data.url);
                imgdata = data.url;
                imgdata = JSON.stringify(imgdata);
                console.log(imgdata + "Is the Link");
                return(imgdata);
               // sendProfilePicture();
            },
            error: function(data) {
                var obj = jQuery.parseJSON(data);
                alert(obj.error);
            }
        });
}


*/