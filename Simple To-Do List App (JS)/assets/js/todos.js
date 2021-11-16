console.log("JS connected");
//Check Off Todos
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
})

//Click X to delete
$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(200, function(){
		$(this).remove();
	});
	event.stopPropagation();
})


//Text Input
$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		var task = $(this).val();
		$(this).val("");
		//create new listed task
		$("ul").append("<li><span> <i class='fas fa-trash'> </i></span>" + task + "</li>");
	}
})


$(".fa-plus").click(function(){
	$("input[type = 'text']").fadeToggle(100);
})

//Click X to delete
$("ul").click(function(){
})

//Click X to delete
$("#container").click(function(){
})

//Click X to delete
$("body").click(function(){
})