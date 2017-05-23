var OnlineUsersManager = require('../../lib/OnlineUsersManager');
var DeviceModel = require('../../Models/Device');

var Const = require("../../lib/consts");

var Config = require("../../lib/init");
var Observer = require("node-observer");


var _19Handler = function(){
    
}


 _19Handler.prototype.attach = function(param,stock,io) {

 	


 	param.content = "[-75, 98, 11, 1, 48, 0, 66, 71, -106, 18, 58, -72, 91, 72, 0, 0, 0, 0, -100, -32, - 11, 5, 0, 0, 127, 7, -77, 33, -33, 2, -40, 105, 9, 0, 16, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35...]"
	

 	stock.send(param);



	
	//Observer.send(this, Const.notificationDeviceoffline, device);

		
}






module["exports"] = new _19Handler();	