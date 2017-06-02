var OnlineUsersManager = require('../../lib/OnlineUsersManager');

var _ = require('lodash');

var SocketHandlerBase = require('../SocketHandlerBase');
var Utils = require('../../lib/utils');
var Const = require("../../lib/consts");


var DeviceModel = require('../../Models/Device');


var TcpSocketAPIHandler = require('../TcpSocketAPIHandler');




var _05Handler = function(){
    
}

_.extend(_05Handler.prototype,SocketHandlerBase.prototype);





 _05Handler.prototype.attach = function(param,socket,io) {
 	// body...

	var self  = this;
	var deviceID = param.deviceid||param.deviceID;;
	var func = param.func;
  var content = param.content

  var deviceModel = DeviceModel.get();
	 deviceModel.findOne({deviceID:param.deviceid},function(err,device){

    if (!device) {      
      console.log("no device");
      
    }

    if (OnlineUsersManager.getOnlineDevicesByDeviceId(deviceID)){
                 var socketdata  = self.successWrite(func,deviceID,content);              
                 TcpSocketAPIHandler.wirteToDevice(deviceID,socketdata) 

    }

  


  })




}



module["exports"] = new _05Handler();	