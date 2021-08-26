var colors = generateRandomColors(6);

var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#try");
var bar = document.getElementById("bar");
var reset = document.getElementById("reset");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard")

easy.addEventListener("click", function(){
	easy.classList.add("selected");
	hard.classList.remove("selected");
	colors = generateRandomColors(3);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";	
		}
	}
	bar.style.backgroundColor = "steelblue";

});


hard.addEventListener("click", function(){
	easy.classList.remove("selected");
	hard.classList.add("selected");
	colors = generateRandomColors(6);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.display = "block";
	}
	bar.style.backgroundColor = "steelblue";

});


reset.addEventListener("click", function(){
	//generate all new colors
	colors = generateRandomColors(6);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	//change colors of squares
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
	}
	bar.style.backgroundColor = "steelblue";
	reset.textContent = "New colors";
	messageDisplay.textContent = "";


});


colorDisplay.textContent = pickedColor;

for(var i = 0; i < squares.length; i++){
	//add color
	squares[i].style.backgroundColor = colors[i];

	//click listeners
	squares[i].addEventListener("click", function(){
		
		var clickedColor = this.style.backgroundColor;

		if(clickedColor === pickedColor){
			messageDisplay.textContent = "CORRECT!";
			changeColors(pickedColor);
			bar.style.backgroundColor = pickedColor;
			reset.textContent = "Play Again?";

		} else {
			console.log(clickedColor + " is not " + pickedColor)
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again";
		}
	});
}



function changeColors(color){
	//loop all squares
	//change each color
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var num = Math.floor(Math.random() * colors.length);
	return colors[num];
}

function generateRandomColors(amount){
	//make an array
	var arr = [];
	//add num random colors to arr
	for(var i = 0; i < amount; i++){
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a red
	var red = Math.floor(Math.random() * 256);
	//pick a green
	var green = Math.floor(Math.random() * 256);
	//pick a blue
	var blue = Math.floor(Math.random() * 256);

	return "rgb(" + red + ", " + green + ", " + blue + ")";
}