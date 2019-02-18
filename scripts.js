$(document).ready(function () {

    //NEW HOME
    $("#btnNewHome").click(function () {
        var strURL = "https://cis-iis2.temple.edu/Fall2018/CIS3344_tug51527/WebAPI/api/deeds/";

        $("#divForm").empty();
        $("#divSearch").css("display", "none");

        $("#divForm")
            .append("<label><h2>ADD NEW HOME INFORMATION<h2><label/>")

            .append("<input id='txtOwnerName' type='text' placeholder='Name' />")
            .append("<br /><input id='txtContact' type='text' placeholder='Contact' />")
            .append("<br /><input id='txtAddress' type='text' placeholder='Address' />")
            .append("<br /><input id='txtHomeBlock' type='text' placeholder='Block' />")
            .append("<br /><input id='txtHomeLot' type='text' placeholder='Lot' />")
            .append("<br /><input id='txtDateOfSale' type='text' placeholder='Date of Sale' />")
            .append("<br /><input id='txtSalePrice' type='text' placeholder='Sale Price' />")

            .append("<br /><br /><input id='btnSubmitNewHome' class='button' type='button' Value='SUBMIT'/>");

        $("#btnSubmitNewHome").click(function () {
            var strURL = "https://cis-iis2.temple.edu/Fall2018/CIS3344_tug51527/WebAPI/api/deeds/";

            var deed = new Object();

            deed.ID = $("$txtID").val();
            deed.Name = $("#txtOwnerName").val();
            deed.Contact = $("#txtContact").val();
            deed.Address = $("#txtAddress").val();
            deed.Block = $("#txtHomeBlock").val();
            deed.Lot = $("#txtHomeLot").val();
            deed.DateOfSale = $("#txtDateOfSale").val();
            deed.SalePrice = $("#txtSalePrice").val();

            var strInput = JSON.stringify(deed);

            // Make an AJAX request to get a home and display the response in the appropriate div.
            $.ajax({
                type: "POST",
                url: strURL,
                contentType: "application/json", // set the data type sent to the Web Service.
                dataType: "json",                               // set the data type expected from the Web Service.
                data: strInput,                                 // send an empty JSON object (no input required).
                success: function (data) {                      // set callback function used to update the page/
                    var result = data;

                    if (result == true)
                        $("#display").text("The record was successfully added to the database.");
                    else
                        $("#display").text("The record was not added to the database. Try again later.");
                },
                error: function (req, status, error) {          // sets the error callback function used when an error occurs.
                    alert("Error: " + req.responseText + " | " + status + " | " + error);
                }

            }); //end of ajax method
        })

        //NEW OWNER
        $("#btnUpdateOwner").click(function () {
            var strURL = "https://cis-iis2.temple.edu/Fall2018/CIS3344_tug51527/WebAPI/api/deeds/";
            $("#divForm").empty();
            $("#divSearch").css("display", "block");
            $("#divForm")
                .append("<label><h2>NEW OWNER NAME<h2><label/>")

                .append("<input id='txtOwnerName' type='text' placeholder='Name' />")

                .append("<br /><input id='btnSubmitNewOwner' class='button' type='button' Value='SUBMIT'/>");

            $("#btnSubmitNewOwner").click(function () {
                var strURL = "https://cis-iis2.temple.edu/Fall2018/CIS3344_tug51527/WebAPI/api/deeds/";

                deed.ID = $("$txtID").val();
                deed.Name = $("#txtOwnerName").val();
                deed.Contact = $("#txtContact").val();
                deed.Address = $("#txtAddress").val();
                deed.Block = $("#txtHomeBlock").val();
                deed.Lot = $("#txtHomeLot").val();
                deed.DateOfSale = $("#txtDateOfSale").val();
                deed.SalePrice = $("#txtSalePrice").val();

                var strInput = JSON.stringify(deed);


                // Make an AJAX request to get a home and display the response in the appropriate div.
                $.ajax({

                    type: "PUT",
                    url: strURL,
                    contentType: "application/json", // set the data type sent to the Web Service.
                    dataType: "json",                               // set the data type expected from the Web Service.
                    data: strInput,                                 // send an empty JSON object (no input required).
                    success: function (data) {                      // set callback function used to update the page/
                        var result = data;

                        if (result == true)
                            $("#display").text("The record was successfully updated to the database.");
                        else
                            $("#display").text("The record was not updated to the database. Try again later.");
                    },
                    error: function (req, status, error) {          // sets the error callback function used when an error occurs.
                        alert("Error: " + req.responseText + " | " + status + " | " + error);
                    }

                }); //end of ajax method
            })

            //DELETE HOME
            $("#btnDeleteHome").click(function () {
                var strURL = "https://cis-iis2.temple.edu/Fall2018/CIS3344_tug51527/WebAPI/api/deeds/";
                $("#divSearch").css("display", "none");
                $("#divForm").empty();
                $("#divForm")
                    .append("<label><h2>ENTER ADDRESS TO BE DELETED<h2><label/>")
                    .append("<input id='txtAddress' type='text' placeholder='Address' />")
                    .append("<br /><br /><input id='btnDelete' class='button' type='button' Value='DELETE'/>");

                $("#btnDeleteHome").click(function () {
                    var strURL = "https://cis-iis2.temple.edu/Fall2018/CIS3344_tug51527/WebAPI/api/deeds/";

                    $.ajax({
                        type: "DELETE",
                        url: strURL,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: "{}",
                        success: function (data) {
                            $("#divForm").empty();
                            $("#divForm").append("<label>" + data.deeds + "<label />");
                        },
                        error: function (req, status, error) {
                            alert("Error: " + req.responseText + " | " + status + " | " + error);
                        }

                    }); //end of ajax method
                })
            })

            //SEARCH
            $("#btnSearchNav").click(function () {
                $("#divForm").empty();
                $("#divSearch").css("display", "block");
            })

            //Search By selected index changed
            $("#selectSearchType").change(function () {

                var selectedVal = $("#selectSearchType").val();

                if (selectedVal === "Address") {
                    $("#spanSearch").empty();
                    $("#spanSearch")
                        .append("<br /><br /><input id='txtAddress' type='text' placeholder='Address' />")
                        .append("<br /><input id='btnSearch' class='button' type='button' Value='SEARCH'/>");

                } else if (selectedVal === "BlockLot") {
                    $("#spanSearch").empty();
                    $("#spanSearch").append("<br /><br /><input id='txtBlock' type='text' placeholder='Block' />")
                        .append("<input id='txtLot' type='text' placeholder='Lot' />")
                        .append("<br /><input id='btnSearch' class='button' type='button' Value='SEARCH'/>");

                } else if (selectedVal === "Owner") {
                    $("#spanSearch").empty();
                    $("#spanSearch")
                        .append("<br /><br /><input id='txtOwner' type='text' placeholder='Owner Name' />")
                        .append("<br /><input id='btnSearch' class='button' type='button' Value='SEARCH'/>");
                }

            });
        })
    })
})