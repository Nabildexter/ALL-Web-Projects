const photos = document.querySelectorAll(".photoPanel");


console.log("There are " + photos.length + " photos.");

var currActive = "pic3";
var currActiveNum = 3;

var one = document.querySelector(".circles i:nth-child(1)");
var two = document.querySelector(".circles i:nth-child(2)");
var three = document.querySelector(".circles i:nth-child(3)");
var four = document.querySelector(".circles i:nth-child(4)");
var five = document.querySelector(".circles i:nth-child(5)");

var circleArray = [one, two, three, four, five];


photos.forEach((photo) => {
  photo.addEventListener("click", () => {

    removeActiveClasses();

    photo.classList.add("active");

	//When You click On N-th Panel
	//N-th Circle should be darken
	//Previous Circle should be clear
	currActive = photo.classList[1];
	console.log(currActive);
	currActiveNum = (currActive[3]);
	console.log(currActiveNum);

	//Change n-th circle to dark circle
	//remove "far"
	circleArray[currActiveNum-1].classList.remove("far");

	//add "fas"
	circleArray[currActiveNum-1].classList.add("fas");



  });
});


function removeActiveClasses() {
  photos.forEach((photo) => {

	//When You click On N-th Panel
	//N-th Circle should be darken
	//Previous Circle should be clear
	currActive = photo.classList[1];
	console.log(currActive);
	currActiveNum = (currActive[3]);
	console.log(currActiveNum);

	//Change n-th circle to dark circle
	//remove "fas"
	circleArray[currActiveNum-1].classList.remove("fas");

	//add "far"
	circleArray[currActiveNum-1].classList.add("far");  	

    photo.classList.remove('active')
  });
}

