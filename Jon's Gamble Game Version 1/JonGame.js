document.querySelector(".DEALBUTTON").disabled = true;
document.querySelector(".RESETBUTTON").disabled = true;
document.querySelector(".BETBUTTON").disabled = true;
document.querySelector(".BETINPUT").disabled = true;
document.querySelector(".MATCHBUTTON").disabled = true;
document.querySelector(".SKIPBUTTON").disabled = true;


var dealingButton = document.querySelector(".DEALBUTTON");
var resetButton = document.querySelector(".RESETBUTTON");
var submitButton = document.querySelector(".SUBMITBUTTON");
var startButton = document.querySelector(".STARTBUTTON");
var betButton = document.querySelector(".BETBUTTON");
var matchButton = document.querySelector(".MATCHBUTTON");
var skipButton = document.querySelector(".SKIPBUTTON");


var betInput = document.querySelector(".BETINPUT");

var card1 = document.querySelector(".card1");
var card2 = document.querySelector(".card2");
var card3 = document.querySelector(".card3");


var c1Rank = 0;
var c2Rank = 0;
var c3Rank = 0;

var count = 0;	

var searchImage ="";

var playerCount = 3;
var truePlayers = 3;


var turn = 1;

var globalForm = document.getElementById("ListofNames");

var newGame = false;

var Dealt = 0;

var Pot = 0;

var theBet = undefined;


//Deals Cards onto the Board
dealingButton.addEventListener("click", function(){

	Dealt++;

	var randomNum = Math.floor(Math.random()*13)+1;
	var randomChar = Math.floor(Math.random()*3);


	var letters =["D", "C", "H", "S"];
	var randomLetter = letters[randomChar];

	// console.log(randomChar);

	// console.log(randomNum + " " + randomChar);

	//Get image string
	searchImage = `${randomNum}${randomLetter}.jpg`;
	// console.log(searchImage);

	//After the second card is dealt you have choices
	if(Dealt == 2){
		document.querySelector(".RESETBUTTON").disabled = false;
		document.querySelector(".BETBUTTON").disabled = false;
		document.querySelector(".BETINPUT").disabled = false;
		document.querySelector(".MATCHBUTTON").disabled = false;

	} 

	//On the third card you have no more choices
	//reset
	else if(Dealt == 3){

		document.querySelector(".BETBUTTON").disabled = true;
		document.querySelector(".BETINPUT").disabled = true;
		document.querySelector(".MATCHBUTTON").disabled = true;
		document.querySelector(".MATCHBUTTON").disabled = true;
		document.querySelector(".DEALBUTTON").disabled = true;
		document.querySelector(".RESETBUTTON").disabled = false;
		Dealt = 0;

	}

	//Get First Card Image
	if(count == 0){
		card1.src = searchImage;
		c1Rank = randomNum;
		count++;		

	}

	//Get Second Card Image
	else if(count == 1){

		while(card1.src == searchImage){
			searchImage
			randomNum = Math.floor(Math.random()*13)+1;
			randomChar = Math.floor(Math.random()*3);
			searchImage = `${randomNum}${randomLetter}.jpg`;
		}

		card3.src = searchImage;
		c2Rank = randomNum;

		//If Both Cards are of the same Rank
		//Player Loses
		//Player pays half the pot
		if(c1Rank == c2Rank){
			console.log("Player should lose half the pot's amount");
			loseHalf();
			return;
		}


		count++;

	}

	//Get Third Card Image
	else if(count == 2){

		while(card1.src == searchImage || card3.src == searchImage){
			searchImage
			randomNum = Math.floor(Math.random()*13)+1;
			randomChar = Math.floor(Math.random()*3);
			searchImage = `${randomNum}${randomLetter}.jpg`;
		}

		card2.src = searchImage;
		c3Rank = randomNum;
		count++;


		//After the third card is placed down, the turn must be calcualted and resolved
		resolveTurn();

	} 

	//Else Resets
	else {
		card1.src = "Gray_back.jpg";
		card3.src = "Gray_back.jpg";
		card2.src = "Gray_back.jpg";
		count = 0;		
	}

});

//Passes on the turn to the next player
resetButton.addEventListener("click", function(){

	theBet = undefined
	document.querySelector(".resultScore").innerHTML = '<i class="fas fa-dice"></i>';

	card1.src = "Gray_back.jpg";
	card3.src = "Gray_back.jpg";
	card2.src = "Gray_back.jpg"

	updateTurnString();
	nextTurn();
});


//Submits Names to the table
submitButton.addEventListener("click", function(){
	insertName();
	clearValue();
});


//Starts the Game or Refreshes the Page
startButton.addEventListener("click", function(){

	if(newGame){
		location.reload();
	} else {
		newGame = true;
	}

	if(playerCount < 2){
		alert("There are " + playerCount + " players\n You need at least 2.");

	} else {
		startGame();
	}

});


//When Players Decide to Bet
betButton.addEventListener("click", function(){

	var playersBet = document.querySelector(".BETINPUT").value;

	if(playersBet > Pot){
		alert("Bet Cannot Exceed Pot!");
		return;
	}
	if(playersBet == ""){
		alert("Bet Cannot Be Empty!");
		return;
	}
	if(playersBet < 1){
		alert("Bet Must BE Possitive!");
		return;
	}

    var table=document.getElementById("listNames");

    // console.log(playersBet + " bet > cash " + table.rows[turn].cells[3].innerHTML);
    // console.log(+playersBet > +table.rows[turn].cells[3].innerHTML);

	if(+playersBet > +table.rows[turn].cells[3].innerHTML){
		alert(table.rows[turn].cells[1].innerHTML + " does not have enough.");
		return;
	}


	theBet = playersBet;
	// console.log("Bet is " + playersBet);
	document.querySelector(".BETINPUT").disabled = true;
	document.querySelector(".BETBUTTON").disabled = true;
	document.querySelector(".MATCHBUTTON").disabled = true;
	document.querySelector(".RESETBUTTON").disabled = true;

});


//When Players Decide to Bet
matchButton.addEventListener("click", function(){

	var table = document.getElementById("listNames");
	// console.log("Bet is " + playersBet);

	if(+Pot > +table.rows[turn].cells[3].innerHTML){
		alert(table.rows[turn].cells[1].innerHTML + " does not have enough.");
		return;
	}

	var playersBet = Pot;
	theBet = playersBet;

	document.querySelector(".BETINPUT").value = Pot;

});


//skipButton
skipButton.addEventListener("click", function(){

	theBet = undefined
	document.querySelector(".resultScore").innerHTML = '<i class="fas fa-dice"></i>';

	card1.src = "Gray_back.jpg";
	card3.src = "Gray_back.jpg";
	card2.src = "Gray_back.jpg"

	updateTurnString();
	nextTurn();

});



function loseDouble(){

}

function loseHalf(player, amount){

    var table=document.getElementById("listNames");

	//Calculate half pot
	var penalty = Math.floor(Pot/2);

	//Calculate Player's amount - penalty
	var resPenalty = document.getElementById("listNames").rows[turn].cells[3].innerHTML - penalty;

	//If player goes too 0 or neg, just do the remaning amount 
	if(resPenalty < 1){

		resPenalty = document.getElementById("listNames").rows[turn].cells[3].innerHTML;


		//Add to Pot
		Pot = +Pot + resPenalty;

		//Player goes bust
		document.getElementById("listNames").rows[turn].cells[3].innerHTML = 0;	

		//Update Display
		document.querySelector(".PotScoring").innerHTML = "Pot: $" + Pot;
		document.querySelector(".resultScore").innerHTML = "You Lose Half the Pot!";

		//Disable Buttons
		document.querySelector(".DEALBUTTON").disabled = true;
		document.querySelector(".BETBUTTON").disabled = true;
		document.querySelector(".BETINPUT").disabled = true;
		document.querySelector(".MATCHBUTTON").disabled = true;

	}

	//Else
	//Lose hald pot amount
	else {

		//Add to Pot
		Pot = +Pot + penalty;

		//Update Dsiplay
		document.getElementById("listNames").rows[turn].cells[3].innerHTML = resPenalty;

		//Update Display
		document.querySelector(".PotScoring").innerHTML = "Pot: $" + Pot;
		document.querySelector(".resultScore").innerHTML = "You Lose !";

		//Disable Buttons
		document.querySelector(".DEALBUTTON").disabled = true;
		document.querySelector(".BETBUTTON").disabled = true;
		document.querySelector(".BETINPUT").disabled = true;
		document.querySelector(".MATCHBUTTON").disabled = true;

	}
	
}


function skip(){

}

function everyoneAdd(){

}


function resolveTurn(){


	if((c3Rank == c1Rank || c3Rank == c2Rank) && theBet > 0){

		console.log("Player should lose double their bet");

		var penalty = 2 * theBet;

		var resPenalty = document.getElementById("listNames").rows[turn].cells[3].innerHTML - penalty;

		if(resPenalty < 1){

			resPenalty = document.getElementById("listNames").rows[turn].cells[3].innerHTML;


			//Add to Pot
			Pot = +Pot + resPenalty;

			//Player goes bust
			document.getElementById("listNames").rows[turn].cells[3].innerHTML = 0;	

			//Update Display
			document.querySelector(".PotScoring").innerHTML = "Pot: $" + Pot;
			document.querySelector(".resultScore").innerHTML = "You Lose Double the Bet!";
		}

		//Else
		//Lose doublet bet
		else {

			//Add to Pot
			Pot = +Pot + penalty;

			//Update Dsiplay
			document.getElementById("listNames").rows[turn].cells[3].innerHTML = resPenalty;

			//Update Display
			document.querySelector(".PotScoring").innerHTML = "Pot: $" + Pot;
			document.querySelector(".resultScore").innerHTML = "You Lose Double the Bet!";

		}

		return;
	}



	// console.log("THE BET IS ---> " + theBet);
	if(typeof theBet == "undefined"){
		document.querySelector(".resultScore").innerHTML = "No Bets Were Placed";
		return;
	} 

		// console.log(c1Rank);
		// console.log(c2Rank);
		// console.log(c3Rank);

	var condition = false;

	condition = inRange(c1Rank, c2Rank, c3Rank);

	// console.log(condition);

	//If Card in Between the two cards
	if(condition){

		//Win
		// console.log("Win " + theBet);
		updatePotWin();

	} 
	else {
		//Lose
		// console.log("Lose " + theBet);
		updatePotLose();


	}
}


function inRange(r1, r2, r3){

	if (r3 > r2 && r3 < r1) {
	  
		return true;
	}


	else if(r3 > r1 && r3 < r2){

		return true;
	}


	else {
		return false;
	}

}

function rand(min, max) {
  var span = max - min;
  return Math.round(Math.random() * span) + min;
}	


function insertName() {

	playerCount++;

    var name = document.getElementById("NAMEINPUT").value;
    var money =  document.getElementById("BUYINPUT").value;

    var table=document.getElementById("listNames");

    var row=table.insertRow(-1);
    var cell1=row.insertCell(0);
    var cell2=row.insertCell(1);
    var cell3=row.insertCell(2);
    var cell4=row.insertCell(3);
    cell1.innerHTML='<th scope="row">' + playerCount+ '</th>';
    cell2.innerHTML=name;        
    cell3.innerHTML=money;
    cell4.innerHTML=money-1;

}


function clearValue() {
  document.getElementById("NAMEINPUT").value = "";
  document.getElementById("BUYINPUT").value = "";
}


function updateTurnString(){

		count = 0;
		turn = turn+1;

		if(turn == playerCount+1){
			turn = 1;
		}

    	var table=document.getElementById("listNames");
		document.querySelector(".TurnScoring").innerHTML = "Turn: " +  table.rows[turn].cells[1].innerHTML;

}


function updatePotWin(){


	var CHIPS = document.getElementById("chipsAudio");
	CHIPS.volume = 0.1;
	CHIPS.play();


	Pot = +Pot - +theBet;
	// console.log("Pot is now: " + Pot);
	document.querySelector(".PotScoring").innerHTML = "Pot: $" + Pot;
	document.querySelector(".resultScore").innerHTML = "You Win!";

	var table=document.getElementById("listNames");
	table.rows[turn].cells[3].innerHTML = +table.rows[turn].cells[3].innerHTML + +theBet;


	//If Pot is 0, steal 1 from every player
	if(Pot == 0){

		Pot = playerCount;
		// console.log("Pot is now: " + Pot);
		document.querySelector(".PotScoring").innerHTML = "Pot: $" + Pot;

		for (var i = 1; i<playerCount+1; i++) {
			var table=document.getElementById("listNames");
			table.rows[i].cells[3].innerHTML = table.rows[i].cells[3].innerHTML  - 1;

		}

	}

}



function updatePotLose(){

	var BOO = document.getElementById("booAudio");
	BOO.volume = 0.01;
	BOO.play();
	

	Pot = +Pot + +theBet;
	// console.log("Pot is now: " + Pot);
	document.querySelector(".PotScoring").innerHTML = "Pot: $" + Pot;
	document.querySelector(".resultScore").innerHTML = "You Lose!";

	var table=document.getElementById("listNames");
	table.rows[turn].cells[3].innerHTML = +table.rows[turn].cells[3].innerHTML - +theBet;

}

function nextTurn(){

	Dealt = 0;
	document.querySelector(".RESETBUTTON").disabled = true;
	document.querySelector(".BETBUTTON").disabled = true;
	document.querySelector(".MATCHBUTTON").disabled = true;
	document.querySelector(".BETINPUT").disabled = true;
	document.querySelector(".DEALBUTTON").disabled = false;
	document.querySelector(".BETINPUT").value = null;

}


function startGame() {

	document.querySelector(".SKIPBUTTON").disabled = false;

    var table=document.getElementById("listNames");

	document.querySelector(".STARTBUTTON").innerHTML = 'NEW GAME!';
	document.querySelector(".PotScoring").innerHTML = "Pot: $" + playerCount;

	Pot = playerCount;

	document.querySelector(".TurnScoring").innerHTML = "Turn: " +  table.rows[turn].cells[1].innerHTML;

	// console.log("Turn 1: " + table.rows[1].cells[1].innerHTML);
	// console.log("Turn 2: " + table.rows[2].cells[1].innerHTML);

	document.querySelector(".DEALBUTTON").disabled = false;


	//Loops through Turns

		//Makes Sure Pot has atleast the same amount of players playing
		//If not, everyone chips in

		//Who ever is at 0, is skipped until they buy back in.

		//New Player Turn

		//Cards Dealt

		//If Automatically Lose

			//Calculates new Amount

			//Next Turn

		//Else

			//Bets or Folds

			//If Bet

				//Deals 3rd Card

				//If Win

					//Calculates new Amount

					//Next Turn

				//If Lose

					//Calculates new Amount

					//Next Turn

			//If Folds

				//Next Turn

}	