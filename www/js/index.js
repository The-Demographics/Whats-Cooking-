$(document).ready(function () {
    $('.button-collapse').sideNav({menuWidth: 240, activationWidth: 100});
    $('#filter-by').material_select();
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

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