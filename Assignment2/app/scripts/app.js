$(function() {


	$.get('/authors', function(data) {
		$.each(data, function(key, author){
			$("#authors").append("<option>" + author.firstName +  ' ' + author.lastName + "</option>");	
		});
		
	});

	$("#showButton").click(function() {
		$(".sample1").slideToggle("slow");
	});

	$("#button2").click(function() {
		$("#sample2").slideToggle("fast");
	});

	$("#addBook").click(function() {
		if(!$("#title").val()) 
		{
			alert('Please enter Title');
			return;
		}

		$("#books").append("<li>" + $("#title").val() + " - " + $("#authors").val() + "</li>");
		$("#title").val("");
	});

	$("#removeBook").click(function() {
		$("#books li:last").remove();
	});

});