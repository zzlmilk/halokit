var OnlineUsersManager = require('../../lib/OnlineUsersManager');
var DeviceModel = require('../../Models/Device');
var UserModel = require('../../Models/User');

var _ = require('lodash');

var SocketHandlerBase = require('../SocketHandlerBase');
var Utils = require('../../lib/utils');
var Const = require("../../lib/consts");



var TcpSocketAPIHandler = require('../TcpSocketAPIHandler');




var _08Handler = function(){
    
}

_.extend(_08Handler.prototype,SocketHandlerBase.prototype);





 _08Handler.prototype.attach = function(param,socket,io) {
 	// body...

	var self  = this;
	var deviceID = param.deviceid||param.deviceID;;
	var clientID = param.clientID || param.clientid;
	var func = param.func;
 var content = param.content





	 var userModel = UserModel.get();

	  var  query= userModel.find(
               {
                  clientID:clientID,
                  deviceID:deviceID,                
              });
               query.exec(function(err,data){


                  if (data.length  ==0) {                  
                  socket.write('socketerror resCodeNullUser');               
                  return;
                  }
                  else{

                  var socketdata  = self.successWrite(func,deviceID,content);      
		  	           //寻找App对应的设备是否不是在线
                   if (OnlineUsersManager.getOnlineDevicesByDeviceId(deviceID)){
                                                     	      
                     TcpSocketAPIHandler.wirteToDevice(deviceID,socketdata) 

                   }
                   else{            

                   	      TcpSocketAPIHandler.wirteToUserWhenDeviceNotOnLine(deviceID,socket,func);                                      		
                   }                       
                  		
                 }
             });


}



module["exports"] = new _08Handler();	