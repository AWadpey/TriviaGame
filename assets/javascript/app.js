$(document).ready(function () {
var trivia = [
    {
        question: "Which animal has a total of THREE hearts?",
        choices: ["Dolphin", "Rhinoceros", "Octopus", "Hippopotamus"],
        answer: 2,
        photo: "assets/images/octopops.jpg"
    },
    {
        question: "Scientists have found evidence that a certain group of animals call each other by name in the wild. Which is it?",
        choices: ["Chimpanzees", "Dolphins", "Elephants", "Goats"],
        answer: 1,
        photo: "assets/images/dolphins.png"
    },
    {
        question: "The extinct colossus penguin stood as tall as ___________.",
        choices: ["LeBron James", "Lionel Messi", "Tom Brady", "Kevin Hart"],
        answer: 0,
        photo: "assets/images/lbj.gif"
    },
    {
        question: "Which water dwelling mammal has the ability to hold a beat?",
        choices: ["Dancing Frog", "Penguin", "Platypus", "Sea Lion"],
        answer: 3,
        photo: "assets/images/sealion.jpg"   
    },
    {
        question: "__________ can run faster than horses, and the males can roar like lions.",
        choices: ["Ostriches", "Cheetahs", "Zebras", "Kangaroos"],
        answer: 0,
        photo: "assets/images/ostrich.jpg"   
    },
    {
        question: "Which of the following statements regarding penguins is TRUE?",
        choices: ["The penguins coloration is for mating purposes.", "They rely of blubber to stay warm.", "Nearly 3% of of ice in Antarctic glaciers is penguin urin.", "The majority of penguins live in the North Pole"],
        answer: 2,
        photo: "assets/images/penguin.jpg"
    },
    {
        question: "Which is the closest living relative to the Tyrannosaurus Rex?",
        choices: ["Alligator", "Komodo Dragon", "Ostrich", "Chicken"],
        answer: 3,
        photo: "assets/images/chicken-rex.png"
    }
    
];


var correctAnswer = 0;
var wrongAnswer = 0;
var noAnswer = 0;
var countdown = 20;
var intervalId;
var userPick ="";
var running = false;
var questionNumber = trivia.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runcountdown();
		for(var i = 0; i < trivia.length; i++) {
	holder.push(trivia[i]);
}
	})
//countdown start
function runcountdown(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
// countdown
function decrement() {
	$("#timeleft").html("<h3>Countdown: " + countdown + "</h3>");
	countdown --;

	//stop countdown when it hits 0
	if (countdown === 0) {
		noAnswer++;
		stop();
		$("#answerblock").html("<p>Out of time! The correct answer choices was: " + pick.choices[pick.answer] + "</p>");
            $("p").css("color", "yellow");
        hidepicture();
	}	
}

// stop countdown
function stop() {
	running = false;
	clearInterval(intervalId);
}
//pick question, then loop and give me answer trivia
function displayQuestion() {
	index = Math.floor(Math.random()*trivia.length);
	pick = trivia[index];


		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choices.length; i++) {
			var userchoices = $("<div>");
			userchoices.addClass("answerchoices");
			userchoices.html(pick.choices[i]);
			userchoices.attr("data-guessvalue", i);
			$("#answerblock").append(userchoices);
}



//click to select answer
$(".answerchoices").on("click", function () {
	userPick = parseInt($(this).attr("data-guessvalue"));

	if (userPick === pick.answer) {
		stop();
		correctAnswer++;
		userPick="";
        $("#answerblock").html("<p>You know your facts!!</p>");
            $("p").css("color", "green");
		hidepicture();

	} else {
		stop();
		wrongAnswer++;
		userPick="";
		$("#answerblock").html("<p>Better luck next time! The right answer was: " + pick.choices[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	trivia.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		countdown= 20;

	//show me score when it is all done
	if ((wrongAnswer + correctAnswer + noAnswer) === questionNumber) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>That is all folks! Let's see how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctAnswer + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongAnswer + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + noAnswer + "</h4>" );
		$("#reset").show();
		correctAnswer = 0;
		wrongAnswer = 0;
		noAnswer = 0;

	} else {
		runcountdown();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		trivia.push(holder[i]);
	}
	runcountdown();
	displayQuestion();

})

})