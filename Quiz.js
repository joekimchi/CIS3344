$(document).ready(function () {

    //make these buttons hidden when site is loaded
    $('#btnRetakeQuiz').hide();
    $('#btnMakeNewQuiz').hide();
    
    //array that holds all the users questions
    var quizQuestions = new Array();
    //which question out of the array
    var questionIndex = 0;
    //how many points the user got
    var userScore = 0;
    //total userScore of all the user inputted scores added up
    var totalScore = 0;
    //initiates cookies
    var cookieC = "";

    //checks if a quiz cookie is present
    //splits cookie into questions
    //builds array of questions

    //document.cookie = "test1=Hello";
    //document.cookie = "test2=World";

    //var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)test2\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    //function alertCookieValue() {
    //    alert(cookieValue);
    //}

    if (document.cookie.indexOf("builtQuiz") >= 0) {

        cookieC = document.cookie.replace(/(?:(?:^|.*;\s*)builtQuiz\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        quizQuestions = JSON.parse(cookieC);
        QuestionFromArray();

    } else {
        //if no quiz exists, then prompt user to click link to make a new quiz
        $("#divQuizTaker").empty();
        $("#divQuizTaker")
            .append("No quiz has been made.")
            .append("<br/>")
            .append("<br/>")
            .append("<a href='QuizBuilder.html'>Make a quiz by clicking here</a>");
    }

    //proper question type appears
    function QuestionFromArray() {

        $("#quizHeader").empty();
        $("#quizHeader").append("Question #" + (questionIndex + 1) + "/" + (quizQuestions.length));

        $("#txtQuestion").val(quizQuestions[questionIndex].question);

        //if question type is multiple choice
        if (quizQuestions[questionIndex].qType == "MultipleChoice") {
                $("#showQuestion").empty();
                $("#showQuestion")

                    .append("a.) ")
                    .append("<input id='mcOption1' readonly='readonly' qType='text'/>")
                    .append("<br />")

                    .append("b.) ")
                    .append("<input id='mcOption2' readonly='readonly' qType='text'/>")
                    .append("<br />")

                    .append("c.) ")
                    .append("<input id='mcOption3' readonly='readonly' qType='text'/>")
                    .append("<br />")

                    .append("d.) ")
                    .append("<input id='mcOption4' readonly='readonly' qType='text'/>")
                    .append("<br />")

                    .append("What's your answer? ")

                    //for results later
                    .append("<select id='selectCorrectChoiceIndex'><option value='1'>a.</option><option value='2'>b.</option><option value = '3'>c.</option><option value = '4'>d.</option></select>");


                //dropdown to select answer
                $("#mcOption1").val(quizQuestions[questionIndex].option1);
                $("#mcOption2").val(quizQuestions[questionIndex].option2);
                $("#mcOption3").val(quizQuestions[questionIndex].option3);
                $("#mcOption4").val(quizQuestions[questionIndex].option4);

            //if question type is true/false
        } else if (quizQuestions[questionIndex].qType == "TrueFalse") {
            $("#showQuestion").empty();
            $("#showQuestion")
                .append("<br />")
                .append("<input id='radioTrue' type='radio'  name='radioTF' value='True' />True")

                //for results later
                .append("<input id='radioFalse' type='radio' name='radioTF' value='False' />False");

            //if question type is short answer
        } else if (quizQuestions[questionIndex].qType == "text") {
            $("#showQuestion").empty();
            $("#showQuestion")
                //for results later
                .append("<input id='ShortAnswer' placeholder='Enter Short Answer Response here' qType='text'/>");
        }
    }

    //Submit Quiz button displays results and if you want to play again/make new quiz
    $("#btnSubmitQuiz").on('click', function () {

        //add answer to question object and make sure that the answer is correct using boolean, and then add userScore
        if (quizQuestions[questionIndex].qType == "MultipleChoice") {
            //if correct choice is chosen, then it's correct
            if (quizQuestions[questionIndex].correctChoiceIndex == $("#selectCorrectChoiceIndex").val()) {
                quizQuestions[questionIndex].isCorrectAnswer = "Correct";
                //adds score
                userScore += parseFloat(quizQuestions[questionIndex].qValue);
            } else {
                quizQuestions[questionIndex].isCorrectAnswer = "Incorrect";
            }
        }

        else if (quizQuestions[questionIndex].qType == "TrueFalse") {

            //if correct radio button for true is chosen, then it's correct
            if (quizQuestions[questionIndex].answer == "true" && $("#radioTrue").is(':checked')) {
                quizQuestions[questionIndex].isCorrectAnswer = "Correct";
                //adds score
                userScore += parseFloat(quizQuestions[questionIndex].qValue);

            //if correct radio button for false is chosen, then it's correct
            } else if (quizQuestions[questionIndex].answer == "false" && $("#radioFalse").is(':checked')) {
                quizQuestions[questionIndex].isCorrectAnswer = "Correct";
                //adds score
                userScore += parseFloat(quizQuestions[questionIndex].qValue);

            } else {
                quizQuestions[questionIndex].isCorrectAnswer = "Incorrect";
            }

        } else if (quizQuestions[questionIndex].qType == "text") {
            quizQuestions[questionIndex].userAnswer = $("#ShortAnswer").val();

            //short answer is correct
            if (quizQuestions[questionIndex].answer == quizQuestions[questionIndex].userAnswer) {
                quizQuestions[questionIndex].isCorrectAnswer = "Correct!";
                //adds score
                userScore += parseFloat(quizQuestions[questionIndex].qValue);
            } else {
                quizQuestions[questionIndex].isCorrectAnswer = "Incorrect!";
            }
        }

        //reloads page
        $("#btnRetakeQuiz").on('click', function () {
            window.location = "Quiz.html"
            
        });

        //takes user to quizbuilder to make new quiz
        $('#btnMakeNewQuiz').on('click', function () {
            window.location = "QuizBuilder.html"
        });

        //add question if another is added or else, just display the results
        if (questionIndex + 1 < quizQuestions.length) {
            questionIndex++;
            QuestionFromArray();
        } else {
            $("#btnSubmitQuiz").hide();
            $("#btnRetakeQuiz").show();
            $("#btnMakeNewQuiz").show();
            DisplayFinal();
        }
    });

    //shows final userScore and answers
    function DisplayFinal() {

        //add to possible totalScore
        for (var i in quizQuestions) {
            totalScore += parseFloat(quizQuestions[i].qValue);
        }

        $("#divQuizGrade")
            .append("<h1>Total Score: " + userScore + "/" + totalScore);

        $("#divQuizGrade").append("<ol id='listQuestions'></ol>");

        //displays question with all data for question
        for (var i in quizQuestions) {
            $("#listQuestions").append("<li>" + JSON.stringify(quizQuestions[i]) + "</li>");
        }

        $("#divQuiz").empty();
    }

});

