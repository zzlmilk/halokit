var observer = require("node-observer");
var hello = require("./hello");


observer.subscribe(this, "HELLO", function(who, data) {
	    console.log(data);
});



hello.send();



