var observer = require("node-observer");

var Hello = function(){}

Hello.prototype.send = function() {
	var device={
			name :"aaaa"
	}
	observer.send(this, "HELLO", device);
};


module.exports = new Hello();










