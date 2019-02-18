var appModule = angular.module('UpdateDeleteRestaurantAngular', []);

function UpdateDeleteRestaurantController($scope, $http, $compile) {
    $scope.initRestaurant = function () {
        $("#searchResults").html("");
        var strURL = "http://cis-iis2.temple.edu/Fall2018/CIS3344_tug51527/WebAPI/api/restaurant/";


        var restaurant = new Object();
        var input = new Object();

        input.theRestaurant = restaurant;

        var request = {
            method: "PUT",
            url: strURL,
            headers: {
                'Content-Type': "application/json; charset=utf-8",
            },
            data: { theRestaurant: restaurant }
        };

        $http(request).then(function (response) {
            var results = response.data.d;

            $.each(restaurant, function (index, restaurant) {
                $("#restaurantList").css("display", "block");
                var btnhtml = '<input id="' + restaurant.ID + '" class="button-primary" type="button" value="Select" ng-click="search(' + restaurant.ID + ')"</tr>';
                var temp = $compile(btnhtml)($scope);
                var html = '<tr><td>' + restaurant.ID + '</td><td>' + restaurant.Name + '</td><td>' + restaurant.Address + '</td><td>' + restaurant.Location + '</td><td>' + restaurant.Phone + '</td><td>' + restaurant.Price_Rating + '</td><td>' + restaurant.Food_Rating + '</td><td>' + restaurant.Cuisine + '</td><td>' + '<img src="' + restaurant.imageURL + '" />';
                $('table tbody').append(html).append(temp);
            });
        },
            function (response) {
                alert("Error: " + response.data);
            });
    }


    // search function
    $scope.search = function (restaurantID) {
        var strURL = "http://cis-iis2.temple.edu/Fall2018/CIS3344_tug51527/WebAPI/api/restaurant/";
        var theID = restaurantID;

        var request = {
            method: "DELETE",
            url: strURL,
            headers: {
                'Content-Type': "application/json; charset=utf-8",
            },
            data: { ID: theID }
        };

        $http(request).
            then(function (response) {
                var restaurant = response.data.d;
                $("#txtID").val(restaurant.ID);
                $("#txtRestaurantName").val(restaurant.Name);
                $("#txtAddress").val(restaurant.Address);
                $("#txtLocation").val(restaurant.Location);
                $("#txtPhoneNumber").val(restaurant.Number);
                $("#txtPriceRating").val(restaurant.Price_Rating);
                $("#txtFoodRating").val(restaurant.Food_rating);
                $("#txtCuisine").val(restaurant.Cuisine);
                $("#txtImageURL").val(restaurant.imageURL);
            },
                function (response) {
                    alert("Error: " + response.data);
                });
    };

    // update function
    $scope.update = function (restaurantID) {
        var idExists = true;
        var ID = $("#txtID").val();
        if (ID === "") {
            idExists = false;
        }

        if (idExists) {
            var restaurant = new Object();
            var strURL = "http://localhost:5257/api/restaurant/";

            restaurant.ID = $("#txtID").val();
            restaurant.Name = $("#txtRestaurantName").val();
            restaurant.Address = $("#txtAddress").val();
            restaurant.Location = $("#txtLocation").val();
            restaurant.Phone = $("#txtPhoneNumber").val();
            restaurant.Food_Rating = $("#txtFoodRating").val();
            restaurant.Price_Rating = $("#txtPriceRating").val();
            restaurant.Cuisine = $("#txtCuisine").val();
            restaurant.imageURL = $("#txtImageURL").val();

            var request = {
                method: "PUT",
                url: strURL,
                headers: {
                    'Content-Type': "application/json; charset=utf-8",
                },
                data: { theRestaurant: restaurant }
            };

            $http(request).
                then(function (response) {
                    var result = response.data.d;
                    if (result === true)
                        $("#successfailure").html("Restaurant Updated.");
                    else
                        $("#successfailure").html("Could not make changes to restaurant.");
                },
                    function (response) {
                        alert("Error: " + response.data);
                    });
        }
        else {
            alert("No restaurants selected.");
        }

        $("#txtID").val("");
        $("#txtRestaurantName").val("");
        $("#txtAddress").val("");
        $("#txtPhoneNumber").val("");
        $("#txtPriceRating").val("");
        $("#txtLocation").val("");
        $("#txtFoodRating").val("");
        $("#txtCuisine").val("");
        $("#txtImageURL").val("");
    };

    // delete function
    $scope.delete = function (restaurantID) {
        var idExists = true;
        var theID = $("#txtID").val();

        if (theID === "") {
            idExists = false;
        }

        if (idExists) {
            var strURL = "http://localhost:5257/api/restaurant/";

            var request = {
                method: "DELETE",
                url: strURL,
                headers: {
                    'Content-Type': "application/json; charset=utf-8",
                },
                data: { id: theID }
            };

            $http(request).
                then(function (response) {
                    var result = response.data.d;
                    if (result === true)
                        $("#successfailure").html("Restaurant Deleted.");
                    else
                        $("#successfailure").html("TRestaurant not deleted.");
                },
                    function (response) {
                        alert("Error: " + response.data);
                    });
        }
        else {
            alert("Error. Please try again.");
        }

        $("#txtID").val("");
        $("#txtRestaurantName").val("");
        $("#txtAddress").val("");
        $("#txtPhoneNumber").val("");
        $("#txtPriceRating").val("");
        $("#txtLocation").val("");
        $("#txtFoodRating").val("");
        $("#txtCuisine").val("");
        $("#txtImageURL").val("");
    };
}


// Create a controller for the application module 
// and attach a function for the controller.
appModule.controller('UpdateDeleteRestaurantController', UpdateDeleteRestaurantController);