var OnlineUsersManager = require('../../lib/OnlineUsersManager');
var DeviceModel = require('../../Models/Device');

var Const = require("../../lib/consts");

var Config = require("../../lib/init");
var Observer = require("node-observer");


	
var log = require("../../lib/log");



var AGPSHandler =  require("../../lib/AGPS");

var TcpSocketAPIHandler = require('../TcpSocketAPIHandler');

var path = require('path');
var resolve = path.resolve('AGPSFile');


var _19Handler = function(){
    
}




 _19Handler.prototype.attach = function(param,stock,io) {

 
 	AGPSHandler.getAGPSFile(resolve,function(data){
 		
 		var agpsfile = data;
 			param.content = agpsfile;
 			TcpSocketAPIHandler.wirteToDevice(param.deviceID,param)	
			//stock.write(agpsfile)
 	});


		
}






module["exports"] = new _19Handler();	