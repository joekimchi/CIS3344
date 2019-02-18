var appModule = angular.module('SearchRestaurantAngular', []);

function SearchRestaurantController($scope, $http) {
    $scope.searchRestaurant = function () {
        $("#searchResults").html("");
        var strURL = "http://cis-iis2.temple.edu/Fall2018/CIS3344_tug51527/WebAPI/api/restaurant/";
        var param = parseInt($("#txtSearchName").val());

        var restaurant = new Object();
        var input = new Object();

        restaurant.Name = $("#txtRestaurantName").val();
        restaurant.Location = $("#txtLocation").val();
        restaurant.Rank = $("#txtFoodRating").val();
        restaurant.Cuisine = $("#txtCuisine").val();

        input.theRestaurant = restaurant;

        method: "GET",
        var request = {
            url: strURL + param,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: { theRestaurant: restaurant }
        };

        $http(request).then(function (response) {
            var results = response.data.d;

            $.each(restaurant, function (index, restaurant) {
                $("#searchResults").append("<p>".concat(
                    "Name: ", restaurant.name,
                    "<br> Address: ", restaurant.Address,
                    "<br> Phone #: ", restaurant.Number,
                    "<br> Price Rating: ", restaurant.Price_Rating,
                    "<br> Food Rating: ", restaurant.Food_Rating,
                    "<br> Location: ", restaurant.Location,
                    "<br> Cuisine: ", restaurant.Cuisine,
                    "<br> Image:<br> <img src=", restaurant.imageURL, " /></p>"));
            });
        },
            function (response) {
                alert("Error: " + response.data);
            });
    };

    $("#txtRestaurantName").val("");
    $("#txtLocation").val("");
    $("#txtFoodRating").val("");
    $("#txtCuisine").val("");
    $("#txtImageURL").val("");
}

//function restaurantjawn() {
//    var strURL = "http://cis-iis2.temple.edu/Fall2018/CIS3344_tug51527/WebAPI/api/restaurant";
//    var param = 1;
//    $.ajax({
//        url: strURL + param,
//        type: 'GET',
//        success: function (result) {
//            alert(result.name);
//        }
//    });
//}

// Create a controller for the application module 
// and attach a function for the controller.
appModule.controller('SearchRestaurantController', SearchRestaurantController);