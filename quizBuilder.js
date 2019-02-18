$(document).ready(function () {

    var questionsArray = new Array();

    //DYNAMIC change div based on dropdown selection
    $("#selectQuestionType").on('change', function () {

        var selectedValue = this.value.toString();

        //blank selected value 
        if (selectedValue === "null") {
            $("#dropdown").empty();
        }

            //if Multiple Choice is selected
        else if (selectedValue === "MultipleChoice") {
            $("#dropdown").empty();

            $("#dropdown")
                .append("<br\>")

                .append("a.) ")
                .append("<input id='mcOption1' type='text' placeholder='Option a.' />")
                .append("<br\>")

                .append("b.) ")
                .append("<input id='mcOption2' type='text' placeholder='Option b.' />")
                .append("<br\>")

                .append("c.) ")
                .append("<input id='mcOption3' type='text' placeholder='Option c.' />")
                .append("<br\>")

                .append("d.) ")
                .append("<input id='mcOption4' type='text' placeholder='Option d.' />")

                .append("<br /><br /><select id='selectCorrectChoiceIndex'><option value = 'null'>Correct Answer:</option> <option value='1'>a.</option><option value='2'>b.</option><option value = '3'>c.</option><option value = '4'>d.</option></select>");
        }

            //if true/false is selected
        else if (selectedValue === "TrueFalse") {
            $("#dropdown").empty();
            $("#dropdown")

                .append("<br />")

                .append("<input id='radioTrue' name='radioTF' type='radio' value='True' />True")
                .append("<input id='radioFalse' name='radioTF' type='radio' value='False' />False");

            //if short answer is selected
        } else if (selectedValue === "text") {
            $("#dropdown").empty();
            $("#dropdown")

                .append("<br\>")
                .append("<input id='ShortAnswer' type='text' placeholder='Enter your answer here' />");

        }
    });

    //clears content in boxes to make way for new question
    function ResetNewQuestionForm() {

        $("#dropdown").empty();

        $("#txtQuestion").val("");
        $("#txtPointValue").val("");
        $("#selectQuestionType").val("null");
    }

    //Add Question button function
    $("#btnAddQuestion").on('click', function () {

        if (!validQuestion()) {
            return;
        }

        //new question object
        var newQuestion = {
            question: $("#txtQuestion").val(),
            qValue: $("#txtPointValue").val(),
            qType: $("#selectQuestionType").val()
        };

        //add fields to new question depending on question type

        if ($("#selectQuestionType").val() === "MultipleChoice") {
            newQuestion.option1 = $("#mcOption1").val();
            newQuestion.option2 = $("#mcOption2").val();
            newQuestion.option3 = $("#mcOption3").val();
            newQuestion.option4 = $("#mcOption4").val();
            newQuestion.correctChoiceIndex = $("#selectCorrectChoiceIndex").val();


        } else if ($("#selectQuestionType").val() === "TrueFalse") {

            if ($("#radioTrue").is(':checked')) {
                newQuestion.answer = "true";
            } else if ($("#radioFalse").is(':checked')) {
                newQuestion.answer = "false";
            }

        } else if ($("#selectQuestionType").val() === "text") {

            newQuestion.answer = $("#ShortAnswer").val();
        }

        questionsArray.push(newQuestion);

        ResetNewQuestionForm();

        alert("Question added!");
    });

    //saves all inputs into cookies
    $("#btnSaveQuiz").on('click', function () {

        if (questionsArray.length == 0) {
            alert("There is no quiz to save.");
            return;
        }

        var jsonQuiz = "[";

        for (var i = 0; i < questionsArray.length; i++) {
            jsonQuiz += JSON.stringify(questionsArray[i]);

            if ((i + 1) < questionsArray.length) {
                jsonQuiz += ","
            }
        }

        jsonQuiz += "]"


        var cookieExpiration = new Date;
        // in the following line, 180 means 180 days. 
        cookieExpiration.setTime(cookieExpiration.getTime() + 180 * 24 * 60 * 60 * 1000);

        document.cookie = "builtQuiz=" + jsonQuiz + "; expires=" + cookieExpiration + "; path=/";

        alert("Quiz saved!");
    });


    //takes user to actual built quiz page
    $('#btnTakeQuiz').click(function () {
        window.location = "Quiz.html"
    });
});



//makes sure user completes everything
function validQuestion() {

    //makes sure user inputs are valid and full
    if ($("#txtQuestion").val() == "") {
        alert("Please type in a question.");
        return false;

    } else if ($("#txtPointValue").val() == "" || isNaN($("#txtPointValue").val())) {
        alert("Point value must be a number.");
        return false;

    } else if ($("#selectQuestionType").val() === "null") {
        alert("Please select the Question Type.");
        return false;
    }

    //if user does something wrong from something in the dropdown
    if ($("#selectQuestionType").val() === "TrueFalse") {

        //if user didn't input all values for mc boxes or choose answer, prompt user to do so
        if ($("#selectQuestionType").val() === "MultipleChoice") {
            if ($("#mcOption1").val() === "" || $("#mcOption2").val() === "" || $("#mcOption3").val() === "" || $("#mcOption4").val() === "" || $("#selectCorrectChoiceIndex").val() === "null") {
                alert("Enter values for all options and select the correct answer.");
                return false;
            }
        }

            //if true or false or not selected, then prompt user to select either
        else if (!$("#radioTrue").is(':checked') && !$("#radioFalse").is(':checked')) {
            alert("Please select true or false.");
            return false;
        }

        //if user didn't input short answer
    } else if ($("#selectQuestionType").val() === "text") {

        if ($("#ShortAnswer").val() === "") {
            alert("Please input a short answer.");
            return false;
        }
    }

    return true;
}


