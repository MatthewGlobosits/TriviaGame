$(document).ready(function(){
var game = [
    {
        question: "What year did The Beatles come to The United States?",
        options: ["1964","1960","1959","1970"],
        answer: 0,
        img:"assests\images\The-Beatles-At-JFK-getting-off-the-plane-530x298.jpg",
        shown: false
    },
    {
        question: "The Fab Four was from what city?",
        options: ["London","Blackpool","Liverpool","Birmingham"],
        answer: 2,
        img:"assests\images\article-2216142-131AA2EC000005DC-583_634x437.jpg",
        shown: false
    },
    {
        question: "What year did The Beatles break-up?",
        options:["1969","1971","1968","1970"],
        answer: 3,
        img:"assests\images\beatlesbreakup.jpg",
        shown: false
    },
    {
        question: "What was The Beatles first U.S. #1 hit?",
        options: ["I wanna hold your hand","Here comes the sun","Come together","All my loving"],
        answer: 0,
        img: "assests\images\Beatles@edsullivan.jpg",
        shown: false
    }];
    
    var correctInput = 0;
    var wrongInput = 0;
    var time = 20;
    var unanswerCount = 0;
    var pick;
    var running = false;
    var imtervalid;
    var index = 0;
    
  
  

    $(".startBtn").on("click", function(){
        $(".startBtn").hide();
        
        for (var i = 0; i < game.length; i++){
            var randonIndex = Math.floor(Math.random()*game.length);
            var currentElement = game[i];
            game[i] = game[randonIndex]
            game[randonIndex] = currentElement;
        }
        
        displayQuestion();
        runTimer();
        $(".reset").hide()
    })

    function displayQuestion() {
       pick = game[index];
       if (index > game.length-1){
           $("#question").empty();
           $("#question").html("<h3>Game Over!  Here's how you did: </h3>");
           $("#answer").append("<h4> Correct: " + correctInput + "</h4>" );
           $("#answer").append("<h4> Incorrect: " + wrongInput + "</h4>" );
           $("#answer").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
           $(".reset").hide();
           correctInput = 0;
           wrongInput = 0;
           unanswerCount = 0;
       }
       else {
           $("#question").html("<h3>" + pick.question + "</h3>");
           for(var i = 0; i < pick.options.length; i++){
               var userGuess = $("<div>");
               userGuess.addClass("correctAnswer");
               userGuess.html(pick.options[i]);

               userGuess.attr("data-guessvalue", i);
               $("#answer").append(userGuess);
               
           }
       }
    

    $(".correctAnswer").on("click", function () {
        userGuess = parseInt($(this).attr("data-guessvalue"));
        index++;
        if(userGuess === pick.answer){
            stop();
            correctInput++;
            userGuess="";
            $("#answer").html("<p> Awesome you got it right!</p>");
            $(".reset").show()
        }
        
        else {
            stop();
            wrongInput++;
            userGuess="";
            $("#answer").html("<p> Oh no! you got it wrong!</p>");
        }
    })
        }

     function runTimer(){
         if (!running) {
             imtervalid = setInterval(decrement, 1000);
             running = true;
            }
        
        }
     function decrement() {
         $("#timeremaining").html*("<h3>Time Remaining: "+ time + "</h3>");
         time --;
         if(time === 0){
                    unanswerCount++;
                    stop();
                    $("#answer").html("<p> Times Up.. The correct anwser is: " + pick.options[pick.answer] + "</p>");
         }
     }

     function stop() {
         running = false;
         clearInterval(imtervalid);
     }

     
             $(".reset").on("click", function (){
                 
                 $("#answer").empty();
                 $("#question").empty();
                 
                    
                 
                 
                 displayQuestion();
                 runTimer();
             })
             
     






    
});