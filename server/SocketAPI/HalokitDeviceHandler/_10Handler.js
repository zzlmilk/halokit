var OnlineUsersManager = require('../../lib/OnlineUsersManager');
var DeviceModel = require('../../Models/Device');

var Utils = require('../../lib/utils');

var Observer = require("node-observer");
var Const = require("../../lib/consts");




var _10Handler = function(){
    
}


 _10Handler.prototype.attach = function(param,stock,io) {
 	// body...
	

	stock.send("");

 	Observer.send(this, Const.notificationDeviceLight, param);



}







module["exports"] = new _10Handler();	