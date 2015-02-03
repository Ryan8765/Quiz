$(document).ready(function() {
	//global variables
	//questions array w/ objects
	var questions = []; 
	questions[0] = {
		question: "What is the slope of the following equation 2y + 6x = 10?",
		option: [3, -3, 6, 8],
		answer: 1
	};
	questions[1] = {
		question: "What is the y-intercept of the following equation 2y + 6x = 10?",
		option: [5, -5, -3, 3], 
		answer: 0
	};
	questions[2] = {
		question: "Solve for x:<br> x<sup>2</sup> = 16", 
		option: ["x = 4","x = -4", "x = &#177;4", "x = 8"],
		answer: 2
	};
	questions[3] = {
		question: "Solve for x in the following equation 8x + 16y = 24",
		option:["x = -2y + 3", "x = 2y - 3", "x = 2y + 3", "x = 23y + 34"], 
		answer: 0
	};
	questions[4] = {
		question: "Simplify: 2x + 5y + 20 - 12 - 5x",
		option: ["-3x + 4y + 7", "3x - 5y - 8", "-3x + 5y + 8", "3x + 5y + 8"],
		answer: 2
	};
	//general global variables
	var numberCorrect = 0;
	var numberIncorrect = 0;
	var percentCorrect;
	var perCorrectUpdate = function () {percentCorrect = Math.round((numberCorrect/(numberCorrect + numberIncorrect)) * 100);
	}
	var questionNumber = 0;
	//check question answer and update
	//image if correct
	//also updates percentCorrect variables
	var questionCorrect = function(inputAnswer) {
		if (questions[questionNumber].answer == inputAnswer) {
			$('#right').fadeIn(1000);
			$('#right').fadeOut(1000);
			numberCorrect = numberCorrect + 1;
			$('#perNumber').text(percentCorrect);
		} else {
			$('#wrong').fadeIn(1000);
			$('#wrong').fadeOut(1000);
			numberIncorrect = numberIncorrect + 1;
			$('#perNumber').text(percentCorrect);
		}
	}
	//for loop to rewrite answer choices
	var answerChoices = function() {
		for (var i = 0; i < 4; i++) {
				$("li:nth-child(" + (i + 1) + ") label").contents().filter(function() {
						return(this.nodeType == 3);
					}).remove();
				$("li:nth-child(" + (i + 1) + ") label").append(questions[questionNumber + 1].option[i]);
		}
	}
	// function to update question and answers
	// after a delay
	var newAnswers = function() {
		setTimeout(function(){
			$('#inputQuestion').html(questions[questionNumber + 1].question);
			$("#queNumber1").text(questionNumber + 2);
			$("#queNumber2").text(questions.length);
			$("input:radio").attr("checked", false);
			answerChoices();
			questionNumber++;
		}, 2000);

	}

	//new quiz function when quiz is over
	var newGame = function () {
		$('#gameover').hide();
		$('#perNumber').text(percentCorrect + "%");
		$('#perCorrect').show();
		$('#input').hide();
	}

	//Enter initial question
	$('#inputQuestion').html(questions[0].question);
	//Enter initial answers
	for (var i = 0; i < 4; i++) {
				$("li:nth-child(" + (i + 1) + ") label").append(questions[0].option[i]);
	}
	//execute function on submit click
	$("#input").on('click','input[type="submit"]', function() {
			event.preventDefault();
			var inputAnswer = $("input[type='radio']:checked").val();
			//if a radio button is checked
			//run function...alert if not.
			if(questionNumber < questions.length - 1) {
				if ($("input[name='answer']").is(":checked")) {
					questionCorrect(inputAnswer);
					newAnswers();
					perCorrectUpdate();
					console.log("percent correct " + numberCorrect + "percent incorrect " + numberIncorrect);		
				} else {
					alert('Please select an answer.');
				}
			} else {
				if (questions[questionNumber].answer == inputAnswer) {
						numberCorrect = numberCorrect + 1;
						perCorrectUpdate();
						newGame();
						
					} else {
						numberIncorrect = numberIncorrect + 1;
						perCorrectUpdate();
						newGame();
					}
				console.log("number correct " + numberCorrect + "number incorrect " + numberIncorrect);	
				
			} 
	})

});