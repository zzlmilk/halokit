var OnlineUsersManager = require('../../lib/OnlineUsersManager');
var DeviceModel = require('../../Models/Device');

var Utils = require('../../lib/utils');





var _06Handler = function(){
    
}


 _06Handler.prototype.attach = function(param,stock,io) {
 	// body...

	 stock.send("light")


}





module["exports"] = new _06Handler();	