var appModule = angular.module('AddRestaurantAngular', []);

function AddRestaurantController($scope, $http) {
    $scope.addRestaurant = function () {
        var strURL = "http://cis-iis2.temple.edu/Fall2018/CIS3344_tug51527/WebAPI/api/estaurant/";

        var Name = $("#txtRestaurantName").val();
        var Address = $("#txtAddress").val();
        var Location = $("#txtLocation").val();
        var Number = $("#txtPhoneNumber").val();
        var Price_Rating = $("#txtPriceRating").val();
        var Food_Rating = $("#txtFoodRating").val();
        var Cuisine = $("#txtCuisine").val();
        var imgURL = $("#txtImageURL").val();
        var isValid = true;

        if (Name === "") {
            isValid = false;
        }

        if (Address === "") {
            isValid = false;
        }

        if (Location === "") {
            isValid = false;
        }

        if (Number === "") {
            isValid = false;
        }

        if (Price_Rating === "") {
            isValid = false;
        }

        if ((Food_Rating === "") || (Food_Rating > 5) || (Food_Rating < 1)) {
            isValid = false;
        }

        if (Cuisine === "") {
            isValid = false;
        }

        if (imgURL === "") {
            isValid = false;
        }

        if (isValid) {
            var restaurant = new Object();
            var input = new Object();

            restaurant.Name = $("#txtRestaurantName").val();
            restaurant.Address = $("#txtAddress").val();
            restaurant.Location = $("#txtLocation").val();
            restaurant.Number = $("#txtPhoneNumber").val();
            restaurant.Food_Rating = $("#txtFoodRating").val();
            restaurant.Price_rating = $("#txtPriceRating").val();
            restaurant.Cuisine = $("#txtCuisine").val();
            restaurant.imageURL = $("#txtImageURL").val();

            input.newRestaurant = restaurant;

            var request = {
                method: "POST",
                url: strURL,
                headers: {
                    'Content-Type': "application/json; charset=utf-8",
                },
                data: { newRestaurant: restaurant }
            };

            $http(request).then(function (response) {
                var result = response.data.d;
                if (result === true)
                    $("#successfailure").text("The Restaurant has been added.");
                else
                    $("#successfailure").text("The Restaurant was not added.");
            },
                function (response) {
                    alert("Error: " + response.data);
                });
        }
        else {
            alert("Try again. Not all fields filled out.");
        }

        $("#txtRestaurantName").val("");
        $("#txtAddress").val("");
        $("#txtLocation").val("");
        $("#txtPhoneNumber").val("");
        $("#txtFoodRating").val("");
        $("#txtPriceRating").val("");
        $("#txtCuisine").val("");
        $("#txtImageURL").val("");
    };
}

// Create a controller for the application module 
// and attach a function for the controller.
appModule.controller('AddRestaurantController', AddRestaurantController);