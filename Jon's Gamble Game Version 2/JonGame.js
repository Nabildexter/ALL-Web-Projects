document.querySelector(".DEALBUTTON").disabled = true;
document.querySelector(".RESETBUTTON").disabled = true;
document.querySelector(".BETBUTTON").disabled = true;
document.querySelector(".BETINPUT").disabled = true;
document.querySelector(".MATCHBUTTON").disabled = true;
document.querySelector(".SKIPBUTTON").disabled = true;
document.querySelector(".ALLINBUTTON").disabled = true;
document.querySelector(".BUYBACKBUTTON").disabled = true;
document.querySelector(".ENDBUTTON").disabled = true;
document.querySelector(".BUYBACKINPUT").disabled = true;


var dealingButton = document.querySelector(".DEALBUTTON");
var resetButton = document.querySelector(".RESETBUTTON");
var submitButton = document.querySelector(".SUBMITBUTTON");
var startButton = document.querySelector(".STARTBUTTON");
var betButton = document.querySelector(".BETBUTTON");
var matchButton = document.querySelector(".MATCHBUTTON");
var skipButton = document.querySelector(".SKIPBUTTON");
var allInButton = document.querySelector(".ALLINBUTTON");
var buyButton = document.querySelector(".BUYBACKBUTTON");
var buyInput = document.querySelector(".BUYBACKINPUT");
var betInput = document.querySelector(".BETINPUT");
var endButton = document.querySelector(".ENDBUTTON");

var card1 = document.querySelector(".card1");
var card2 = document.querySelector(".card2");
var card3 = document.querySelector(".card3");


var c1Rank = 0;
var c2Rank = 0;
var c3Rank = 0;

var count = 0;	

var searchImage ="";

var playerCount = 0;
var truePlayers = 0;


var turn = 1;

var globalForm = document.getElementById("ListofNames");

var newGame = false;

var Dealt = 0;

var Pot = 0;

var theBet = undefined;

var selectedColors = "Gray_back.jpg";


var Gray = document.querySelector(".Gray");
var Yellow = document.querySelector(".Yellow");
var Green = document.querySelector(".Green");
var Blue = document.querySelector(".Blue");
var Red = document.querySelector(".Red");
var Purple = document.querySelector(".Purple");



//Deals Cards onto the Board
dealingButton.addEventListener("click", function(){

	var table = document.getElementById("listNames");

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
		document.querySelector(".ALLINBUTTON").disabled = false;

		//If cash out less than pot, cannot match
		if(table.rows[turn].cells[3].innerHTML < Pot){

			console.log("Cannot match.");
			console.log((table.rows[turn].cells[3].innerHTML + " < " + +Pot));
			document.querySelector(".MATCHBUTTON").disabled = true;

		}


		//If cash out more than pot, cannot all in
		else if(table.rows[turn].cells[3].innerHTML > Pot) {

			console.log("Cannot All In.");
			console.log((table.rows[turn].cells[3].innerHTML + " > " + +Pot));
			document.querySelector(".ALLINBUTTON").disabled = true;

		}

	} 

	//On the third card you have no more choices
	//reset
	else if(Dealt == 3){

		document.querySelector(".BETBUTTON").disabled = true;
		document.querySelector(".BETINPUT").disabled = true;
		document.querySelector(".MATCHBUTTON").disabled = true;
		document.querySelector(".ALLINBUTTON").disabled = true;
		document.querySelector(".DEALBUTTON").disabled = true;
		document.querySelector(".RESETBUTTON").disabled = false;
		document.querySelector(".SKIPBUTTON").disabled = true;

		Dealt = 0;

	}

	//Get First Card Image
	if(count == 0){

		card1.classList.remove("NOTFLIPPED");

		card1.src = searchImage;
		c1Rank = randomNum;

		console.log("First Card: " + c1Rank);
		count++;		
	}


	//Get Second Card Image
	else if(count == 1){

		card3.classList.remove("NOTFLIPPED");

		card3.src = searchImage;

		while(card1.src == card3.src){
			// console.log("repeated found !!!!!!!!!!!!!! ");
			randomNum = Math.floor(Math.random()*13)+1;
			randomChar = Math.floor(Math.random()*3);
			searchImage = `${randomNum}${randomLetter}.jpg`;
			card3.src = searchImage;
		}


		c2Rank = randomNum;

		console.log("Second Card: " + c2Rank);

		//If Both Cards are of the same Rank
		//Player Loses
		//Player pays half the pot
		if(c1Rank == c2Rank){
			console.log("Player loses half the pot's amount (rounded down): $ " + Math.floor((Pot/2)/.25)*.25);
			loseHalf();
			return;
		}

		count++;
	}

	//Get Third Card Image
	else if(count == 2){

		card2.classList.remove("NOTFLIPPED");

		card2.src = searchImage;

		while(card1.src == card2.src || card3.src == card2.src){
			// console.log("repeated found !!!!!!!!!!!!!! ");
			randomNum = Math.floor(Math.random()*13)+1;
			randomChar = Math.floor(Math.random()*3);
			searchImage = `${randomNum}${randomLetter}.jpg`;
			card2.src = searchImage;
		}


		c3Rank = randomNum;

		console.log("Third Card: " + c3Rank);

		count++;

		//After the third card is placed down, the turn must be calcualted and resolved
		resolveTurn();

	} 

	//Else Resets
	else {
		alert("THIS WORKS");
		card1.src = selectedColors;
		card3.src = selectedColors;
		card2.src = selectedColors;
		count = 0;		
	}

});


//Passes on the turn to the next player
resetButton.addEventListener("click", function(){

	card1.classList.add("NOTFLIPPED");
	card3.classList.add("NOTFLIPPED");
	card2.classList.add("NOTFLIPPED");


	calculateNet();

    var table=document.getElementById("listNames");

	console.log("Next ->");

	theBet = undefined
	document.querySelector(".resultScore").innerHTML = '<i class="fas fa-dice"></i>';

	card1.src = selectedColors;
	card3.src = selectedColors;
	card2.src = selectedColors;


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

	if(playerCount < 2){
		alert("There are " + playerCount + " players\n You need at least 2.");
		return;

	} else {

		if(newGame){
			location.reload();
		} else {
			newGame = true;
		}

		startGame();
	}

});


//When Players Decide to Bet
betButton.addEventListener("click", function(){

	var playersBet = (document.querySelector(".BETINPUT").value - 0);

	if(playersBet > Pot){
		alert("Bet Cannot Exceed Pot!");
		return;
	}
	if(playersBet == ""){
		alert("Bet Cannot Be Empty!");
		return;
	}
	if(playersBet <= 0){
		alert("Bet Must BE Positive!");
		return;
	}
	if(playersBet%.25 != 0){
		alert("Bet Must BE In Multiples of 0.25!");
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
	console.log("Bet: " + playersBet);
	document.querySelector(".BETINPUT").disabled = true;
	document.querySelector(".BETBUTTON").disabled = true;
	document.querySelector(".MATCHBUTTON").disabled = true;
	document.querySelector(".ALLINBUTTON").disabled = true;
	document.querySelector(".RESETBUTTON").disabled = true;

});


//When Players Decide to Match
matchButton.addEventListener("click", function(){

	var table = document.getElementById("listNames");
	// console.log("Bet is " + playersBet);

	if(+Pot > +table.rows[turn].cells[3].innerHTML){
		alert(table.rows[turn].cells[1].innerHTML + " does not have enough.");
		return;
	}

	var playersBet = Pot;
	theBet = playersBet;

	console.log("Match Bet: " + playersBet);
	document.querySelector(".BETINPUT").value = Pot;

});


//When Players Decide to All In
allInButton.addEventListener("click", function(){

	var table = document.getElementById("listNames");

	var playersBet = table.rows[turn].cells[3].innerHTML;

	//If pot larger or equal to all in
	if(+Pot >= playersBet){
		theBet = playersBet;
	}
	
	else {
		alert("Player's wallet is greater than the pot.");
		return;
	}

	console.log("All In Bet: " + playersBet);
	document.querySelector(".BETINPUT").value = theBet;

});




//skipButton
skipButton.addEventListener("click", function(){

	console.log("Skip ->");

	theBet = undefined
	document.querySelector(".resultScore").innerHTML = '<i class="fas fa-dice"></i>';

	card1.src = "Gray_back.jpg";
	card3.src = "Gray_back.jpg";
	card2.src = "Gray_back.jpg"

	updateTurnString();
	nextTurn();

});



//Players Buy Back In
buyButton.addEventListener("click", function(){

	var table = document.getElementById("listNames");


	//Takes Input
	var BuyBackval = document.querySelector(".BUYBACKINPUT").value;

	if(BuyBackval < 0.5 || BuyBackval%.25 != 0){
		alert("Buy Back Must Be At Least $ 0.5 and divisible by 0.25");
		return;
	}

	console.log(table.rows[turn].cells[1].innerHTML + " Buys Back In: " + BuyBackval);


	//Updates Buy In
	table.rows[turn].cells[2].innerHTML = +table.rows[turn].cells[2].innerHTML + +BuyBackval;

	//Updates Cash Out
	table.rows[turn].cells[3].innerHTML = (BuyBackval);

	//Adds 0.25 to the Pot
	console.log("Pot was: " + Pot);	
	Pot = Pot + 0.25;
	console.log("Pot Now: " + Pot);

	//Minus 0.25 from the Buy In
	console.log("Buy Back was: " + BuyBackval);
	table.rows[turn].cells[3].innerHTML = (table.rows[turn].cells[3].innerHTML - 0.25);
	console.log("Cash Out Now: " + (BuyBackval-.25));


	//Disables Buy Back Buttons and Skip Button
	buyButton.disabled = true;
	buyInput.disabled = true;
	skipButton.disabled = true;
	clearBuyBack();


	//Enables Next Turn
	resetButton.disabled = false;


	//truePlayers plus 1
	console.log("True player count was: " + truePlayers);
	truePlayers++;
	console.log("True player count now: " + truePlayers);


	//Update Displays
	document.querySelector(".PotScoring").innerHTML = "Pot: $" + Pot;
	document.querySelector(".resultScore").innerHTML = table.rows[turn].cells[1].innerHTML + " Bought Back In: " + BuyBackval;

	
	var Kaching = document.getElementById("kachingAudio");
	Kaching.volume = 0.01;
	Kaching.play();


});


//Players End Game
endButton.addEventListener("click", function(){

	var table = document.getElementById("listNames");

	//Disable All Buttons
	document.querySelector(".DEALBUTTON").disabled = true;
	document.querySelector(".RESETBUTTON").disabled = true;
	document.querySelector(".BETBUTTON").disabled = true;
	document.querySelector(".BETINPUT").disabled = true;
	document.querySelector(".MATCHBUTTON").disabled = true;
	document.querySelector(".SKIPBUTTON").disabled = true;
	document.querySelector(".ALLINBUTTON").disabled = true;
	document.querySelector(".BUYBACKBUTTON").disabled = true;
	document.querySelector(".ENDBUTTON").disabled = true;
	document.querySelector(".BUYBACKINPUT").disabled = true;

	console.log("");
	console.log("<----- Game Ends ------>")


	calculateEnd();

	//Console Output Results
	for (var i = 1; i<playerCount+1; i++) {
			
		var outRes = table.rows[i].cells[3].innerHTML - +table.rows[i].cells[2].innerHTML;

		console.log(table.rows[i].cells[1].innerHTML + "'s Net: " + outRes);

	}


	//Update Display
	document.querySelector(".PotScoring").innerHTML = "Pot: $" + Pot;
	document.querySelector(".resultScore").innerHTML = "Game Over";
	document.querySelector(".TurnScoring").innerHTML = "Turn: Over";



});


//Change Colors
Gray.addEventListener("click", function(){

	//Change all non fliped cards to this color
	var allCards = document.getElementsByTagName("img");

	for(var i=0; i<allCards.length;i++){

		if(allCards[i].classList.contains("NOTFLIPPED")){
			allCards[i].src = "Gray_back.jpg";
		}
	}

	//Change selected colour
	selectedColors = "Gray_back.jpg";

});
Yellow.addEventListener("click", function(){

	//Change all non fliped cards to this color
	var allCards = document.getElementsByTagName("img");

	for(var i=0; i<allCards.length;i++){

		if(allCards[i].classList.contains("NOTFLIPPED")){
			allCards[i].src = "Yellow_back.jpg";
		}
	}

	//Change selected colour
	selectedColors = "Yellow_back.jpg";

});

Green.addEventListener("click", function(){

	//Change all non fliped cards to this color
	var allCards = document.getElementsByTagName("img");

	for(var i=0; i<allCards.length;i++){

		if(allCards[i].classList.contains("NOTFLIPPED")){
			allCards[i].src = "Green_back.jpg";
		}
	}

	//Change selected colour
	selectedColors = "Green_back.jpg";

});

Blue.addEventListener("click", function(){

	//Change all non fliped cards to this color
	var allCards = document.getElementsByTagName("img");

	for(var i=0; i<allCards.length;i++){

		if(allCards[i].classList.contains("NOTFLIPPED")){
			allCards[i].src = "Blue_back.jpg";
		}
	}

	//Change selected colour
	selectedColors = "Blue_back.jpg";

});

Red.addEventListener("click", function(){

	//Change all non fliped cards to this color
	var allCards = document.getElementsByTagName("img");

	for(var i=0; i<allCards.length;i++){

		if(allCards[i].classList.contains("NOTFLIPPED")){
			allCards[i].src = "Red_back.jpg";
		}
	}

	//Change selected colour
	selectedColors = "Red_back.jpg";

});

Purple.addEventListener("click", function(){

	//Change all non fliped cards to this color
	var allCards = document.getElementsByTagName("img");

	for(var i=0; i<allCards.length;i++){

		if(allCards[i].classList.contains("NOTFLIPPED")){
			allCards[i].src = "Purple_back.jpg";
		}
	}

	//Change selected colour
	selectedColors = "Purple_back.jpg";

});





function loseHalf(){

    var table=document.getElementById("listNames");

	//Calculate half pot
	var penalty = Math.floor((Pot/2)/.25)*.25;

	//Calculate Player's amount - penalty
	var resPenalty = document.getElementById("listNames").rows[turn].cells[3].innerHTML - penalty;

	//If player goes negative, just do the remaning amount 
	if(resPenalty < 1){

		console.log(table.rows[turn].cells[1].innerHTML + " does not have enough money.");

		resPenalty = document.getElementById("listNames").rows[turn].cells[3].innerHTML;

		console.log(table.rows[turn].cells[1].innerHTML + " loses: " + resPenalty);

		console.log("half penalty when not enough: " + resPenalty);
		console.log("Pot was: " + Pot);


		//Add to Pot
		Pot = +Pot + +resPenalty;
		console.log("Pot now: " + Pot);


		//Minus from Player
		console.log(table.rows[turn].cells[1].innerHTML + " goes bust!")
		table.rows[turn].cells[3].innerHTML = 0;
		console.log("wallet now: " + table.rows[turn].cells[3].innerHTML);


		//Update Display
		document.querySelector(".PotScoring").innerHTML = "Pot: $" + Pot;
		document.querySelector(".resultScore").innerHTML = "You Lose Half the pot but you don't cover: $ " + resPenalty;


		//Disable Buttons
		document.querySelector(".DEALBUTTON").disabled = true;
		document.querySelector(".BETBUTTON").disabled = true;
		document.querySelector(".BETINPUT").disabled = true;
		document.querySelector(".MATCHBUTTON").disabled = true;
		document.querySelector(".ALLINBUTTON").disabled = true;
		document.querySelector(".BUYBACKBUTTON").disabled = false;
		document.querySelector(".BUYBACKINPUT").disabled = false;


	}

	//Else
	//Lose hald pot amount
	else {

		//Add to Pot
		console.log("half penalty: " + penalty);
		console.log("Pot was: " + Pot);
		Pot = +Pot + penalty;
		console.log("Pot now: " + Pot);


		//Update Dsiplay
		document.getElementById("listNames").rows[turn].cells[3].innerHTML = resPenalty;
		console.log("Wallet now: " + resPenalty);

		//Update Display
		document.querySelector(".PotScoring").innerHTML = "Pot: $" + Pot;
		document.querySelector(".resultScore").innerHTML = "You Lose Half the Pot $ " + penalty;


		//Disable Buttons
		document.querySelector(".DEALBUTTON").disabled = true;
		document.querySelector(".BETBUTTON").disabled = true;
		document.querySelector(".BETINPUT").disabled = true;
		document.querySelector(".MATCHBUTTON").disabled = true;
		document.querySelector(".ALLINBUTTON").disabled = true;

	}

	//If Player goes Bust
	if(document.getElementById("listNames").rows[turn].cells[3].innerHTML == 0){

		// document.getElementById("listNames").rows[turn].cells[3].innerHTML = '<button class="btn btn-default btn-lg BUYBACKBUTTON"><i class="fas fa-coins"></i>' +   "Buy Back In" + '</button>';

		document.querySelector(".BUYBACKBUTTON").disabled = false;
		document.querySelector(".BUYBACKINPUT").disabled = false;

		console.log("True player count was: " + truePlayers);
		truePlayers--;
		console.log("True player count now: " + truePlayers);

	}

	calculateNet();
}


function skip(){

}


function everyoneAdd(){

}


function resolveTurn(){


	//If third card matches 2 of any previous cards
	if((c3Rank == c1Rank || c3Rank == c2Rank) && theBet > 0){

		console.log("Player loses double their bet: " + theBet*2);

		var penalty = 2 * theBet;

		var resPenalty = document.getElementById("listNames").rows[turn].cells[3].innerHTML - penalty;


		//If player goes negative
		if(resPenalty < 1){

			resPenalty = document.getElementById("listNames").rows[turn].cells[3].innerHTML;

			console.log("Player does not have enough, loses: " + resPenalty);


			//Add to Pot
			console.log("Pot was: " + Pot);	
			Pot = +Pot + +resPenalty;
			console.log("Pot Now: " + Pot);

			//Player goes bust
			console.log(document.getElementById("listNames").rows[turn].cells[1].innerHTML + " goes bust!");
			document.getElementById("listNames").rows[turn].cells[3].innerHTML = 0;
			console.log("True player count was: " + truePlayers);
			truePlayers--;
			console.log("True player count now: " + truePlayers);
			// document.getElementById("listNames").rows[turn].cells[3].innerHTML = '<button class="btn btn-default btn-lg BUYBACKBUTTON"><i class="fas fa-coins"></i>' +   "Buy Back In" + '</button>';


			//Update Display
			document.querySelector(".PotScoring").innerHTML = "Pot: $" + Pot;
			document.querySelector(".resultScore").innerHTML = "You Lose Double the Bet!";

			//Enable Buy Back IN
			document.querySelector(".BUYBACKBUTTON").disabled = false;
			document.querySelector(".BUYBACKINPUT").disabled = false;


		}

		//Else
		//Lose doublet bet
		else {


			//Add to Pot
			console.log("Pot was: " + Pot);	
			Pot = +Pot + penalty;
			console.log("Pot Now: " + Pot);

			//Update Dsiplay
			document.getElementById("listNames").rows[turn].cells[3].innerHTML = resPenalty;
			console.log("Wallet now: " + resPenalty);

			//Update Display
			document.querySelector(".PotScoring").innerHTML = "Pot: $" + Pot;
			document.querySelector(".resultScore").innerHTML = "You Lose Double the Bet!";

		}

		calculateNet();
		return;
	}



	// console.log("THE BET IS ---> " + theBet);
	if(typeof theBet == "undefined"){
		document.querySelector(".resultScore").innerHTML = "No Bets Were Placed";
		console.log("No bets were placed.")
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

	truePlayers = playerCount;

    var name = document.getElementById("NAMEINPUT").value;
    var money =  document.getElementById("BUYINPUT").value;

	if(money < 0.5){
		alert("You must have a buy-in of at least $ 0.5 to even play a turn.");
		return;
	}
	if(money % 0.25 != 0){
		alert("Buy in must be divisible by 0.25");
		return;		
	}

    var table=document.getElementById("listNames");

    var row=table.insertRow(-1);
    var cell1=row.insertCell(0);
    var cell2=row.insertCell(1);
    var cell3=row.insertCell(2);
    var cell4=row.insertCell(3);
    var cell5=row.insertCell(4);

    cell1.innerHTML='<th scope="row">' + playerCount+ '</th>';
    cell2.innerHTML=name;        
    cell3.innerHTML=money;
    cell4.innerHTML=money-.25;
    cell5.innerHTML = cell4.innerHTML - +cell3.innerHTML;

}

//Clear all values from inputs
function clearValue() {

  document.getElementById("NAMEINPUT").value = "";
  document.getElementById("BUYINPUT").value = "";

}

//Clear all values from inputs
function clearBuyBack(){

	document.querySelector(".BUYBACKINPUT").value = "";

	calculateNet();
}



function updateTurnString(){

		calculateNet();

		count = 0;
		turn++;

		calculateNet();


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
	document.querySelector(".PotScoring").innerHTML = "Pot: $" + Pot;
	document.querySelector(".resultScore").innerHTML = "You Win!";


	var table=document.getElementById("listNames");
	table.rows[turn].cells[3].innerHTML = +table.rows[turn].cells[3].innerHTML + +theBet;

	console.log(table.rows[turn].cells[1].innerHTML + " Wins: " + theBet);

	calculateNet();


	console.log("Pot is now: " + Pot);
	console.log("Wallet now: " + table.rows[turn].cells[3].innerHTML);

	//If Pot is 0, steal .25 from every player
	if(Pot == 0){

		console.log("Every Player Puts 0.25 Chip In.")

		Pot = truePlayers * .25;

		document.querySelector(".PotScoring").innerHTML = "Pot: $" + Pot;

		var table=document.getElementById("listNames");


		for (var i = 1; i<playerCount+1; i++) {
			
			//If player is already bust
			if(table.rows[i].cells[3].innerHTML == 0){

				//do nothing

			}

			else {

				table.rows[i].cells[3].innerHTML = table.rows[i].cells[3].innerHTML  - .25;

				//If player is already bust
				if(table.rows[i].cells[3].innerHTML == 0){

					console.log(table.rows[i].cells[1].innerHTML + " goes bust!")
					console.log("True player count was: " + truePlayers);	
					truePlayers--;
					console.log("True player count now: " + truePlayers);

				}


			}
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

	calculateNet();


	//If Player goes Bust
	if(document.getElementById("listNames").rows[turn].cells[3].innerHTML == 0){

		console.log(table.rows[turn].cells[1].innerHTML + " goes bust!");

		console.log("True player count was: " + truePlayers);
		truePlayers--;
		console.log("True player count now: " + truePlayers);

		document.querySelector(".BUYBACKBUTTON").disabled = false;
		document.querySelector(".BUYBACKINPUT").disabled = false;

	} 


}



function nextTurn(){


    var table=document.getElementById("listNames");


	console.log(" ");
	console.log(table.rows[turn].cells[1].innerHTML + "'s Turn -----------------------");
	console.log("Pot: $" + Pot + "     Wallet: $" + document.getElementById("listNames").rows[turn].cells[3].innerHTML); 

	Dealt = 0;

	document.querySelector(".resultScore").innerHTML = ("You have: " + table.rows[turn].cells[3].innerHTML);


	//Reset Buttons
	document.querySelector(".RESETBUTTON").disabled = true;
	document.querySelector(".BETBUTTON").disabled = true;
	document.querySelector(".BETINPUT").disabled = true;
	document.querySelector(".BETINPUT").value = null;
	document.querySelector(".MATCHBUTTON").disabled = true;
	document.querySelector(".ALLINBUTTON").disabled = true;
	document.querySelector(".DEALBUTTON").disabled = false;
	document.querySelector(".SKIPBUTTON").disabled = false;


	//If Player is already Bust
	if(document.getElementById("listNames").rows[turn].cells[3].innerHTML == 0){
		
		// document.querySelector(".BETBUTTON").disabled = true;
		// document.querySelector(".BETINPUT").disabled = true;
		// document.querySelector(".BETINPUT").value = null;
		// document.querySelector(".MATCHBUTTON").disabled = true;
		// document.querySelector(".ALLINBUTTON").disabled = true;
		document.querySelector(".DEALBUTTON").disabled = true;
		document.querySelector(".BUYBACKBUTTON").disabled = false;
		document.querySelector(".BUYBACKINPUT").disabled = false;

	}

	//If Player is not bust
	else {

		//Canot Buy Back
		document.querySelector(".BUYBACKBUTTON").disabled = true;
		document.querySelector(".BUYBACKINPUT").disabled = true;



	}


}



function startGame() {

	//Remove Input Name, Buy In and Submit Button
	submitButton.remove();
    var name = document.getElementById("NAMEINPUT");
    var money =  document.getElementById("BUYINPUT");
    name.remove();
    money.remove();


    //Very First Turn
	console.log("<------ Game Starts ------>");
	console.log("");


    var table=document.getElementById("listNames");

	Pot = playerCount*.25;

	document.querySelector(".SKIPBUTTON").disabled = false;


	document.querySelector(".STARTBUTTON").innerHTML = '<i class="fas fa-gamepad"></i>	New Game!';
	document.querySelector(".PotScoring").innerHTML = "Pot: $" + Pot;

	document.querySelector(".TurnScoring").innerHTML = "Turn: " +  table.rows[turn].cells[1].innerHTML;

	document.querySelector(".DEALBUTTON").disabled = false;
	document.querySelector(".ENDBUTTON").disabled = false;


	console.log(table.rows[turn].cells[1].innerHTML + "'s Turn -----------------------");
	console.log("Pot: $" + Pot + "     Wallet: $" + document.getElementById("listNames").rows[turn].cells[3].innerHTML); 


	document.querySelector(".resultScore").innerHTML = ("You have: " + table.rows[turn].cells[3].innerHTML);


}	


//Iterate Through Table and Calculate Net Scores
function calculateNet(){

    var table=document.getElementById("listNames");


	for (var i = 1; i<playerCount+1; i++) {
		
		var outRes = +table.rows[i].cells[3].innerHTML - +table.rows[i].cells[2].innerHTML;

		// console.log(table.rows[turn].cells[1].innerHTML + "'s Net: " + outRes);

		table.rows[i].cells[4].innerHTML = outRes;

	}

}

//Iterate Through Table and Calculate End Game Scores
function calculateEnd(){

	var totalOut = 0;

	var totalBuyIn = 0;

    var table=document.getElementById("listNames");

    var share = (Pot/playerCount);

    console.log("Game Ending. Split Pot: " + Pot);
    console.log("There are " + playerCount + " Players.");
    console.log("Each get: " + share);

	for (var i = 1; i<playerCount+1; i++) {
		
		//Split the share to each player
		table.rows[i].cells[3].innerHTML = (+table.rows[i].cells[3].innerHTML + +share).toFixed(2);

		totalOut = +totalOut + +table.rows[i].cells[3].innerHTML;
		totalBuyIn = +totalBuyIn + +table.rows[i].cells[2].innerHTML;

		//To Stop Rounding Errors
		if(i == playerCount){

			var diff = totalOut - totalBuyIn;

			// table.rows[i].cells[3].innerHTML = (+table.rows[i].cells[3].innerHTML + +diff).toFixed(2);

			table.rows[i].cells[2].innerHTML = (+table.rows[i].cells[2].innerHTML + +diff).toFixed(2);
		}

	}

	Pot = 0;


	for (var i = 1; i<playerCount+1; i++) {
		
		var outRes = (+table.rows[i].cells[3].innerHTML - +table.rows[i].cells[2].innerHTML).toFixed(2);

		// console.log(table.rows[turn].cells[1].innerHTML + "'s Net: " + outRes);

		table.rows[i].cells[4].innerHTML = outRes;

	}	
}