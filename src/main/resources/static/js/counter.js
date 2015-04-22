(function ( $ ) {
 
	var counter = 0;
	var amount = 10;
	
	// JQuery plugin for displaying count
    $.fn.displayLocalCount = function(action) {
        
    	var msg = "";
    	if (action === "add") {
    		counter++;
    		msg = "added"
    	} else if (action === "remove") {
    		counter--;
    		msg = "removed"
    	} else {
    		msg = "Say what?";
    	}
    	
    	this.html("<p>Count: " +  counter + " after action " + msg);
        return this;
    };
    
    $.fn.displayServerCount = function(action) {
    	
    	var msg = "";
    	
    	var url = "count"
    	var data = {
    		action : action,
    		amount : 10
    	};
    	
    	$.ajax({
    		url : url,
    		data : data
    	}).done($.proxy(function(response) {

    		this.html("Count: " +  response.value + " after server action.");
    		
    	}, this));
    	
        return this;
    };
    
    
}( jQuery ));

$(function() {

	var outputSelector = ".output";
	
	// Setup button clicks
	var addHandler = function() {

		var display = $(outputSelector);
	
		var useServer = $(".useServer").is(":checked");
		
		if (useServer) {
			display.displayServerCount("add");
		} else {
			display.displayLocalCount("add");
		}
		
	};
	
	var removeHandler = function() {
		
		var display = $(outputSelector);
	
		var useServer = $(".useServer").is(":checked");
		
		if (useServer) {
			display.displayServerCount("remove");
		} else {
			display.displayLocalCount("remove");
		}
		
	}
	
	$("button.addCount").on("click", addHandler);
	$("button.removeCount").on("click", removeHandler);
});
