var OnlineUsersManager = require('../../lib/OnlineUsersManager');
var DeviceModel = require('../../Models/Device');
var UserModel = require('../../Models/User');

var _ = require('lodash');

var SocketHandlerBase = require('../SocketHandlerBase');
var Utils = require('../../lib/utils');
var Const = require("../../lib/consts");
var TcpSocketAPIHandler = require('../TcpSocketAPIHandler');



var _00Handler = function(){
    
}

_.extend(_00Handler.prototype,SocketHandlerBase.prototype);



  
 _00Handler.prototype.attach = function(param,socket,io) {
 	// body...

    /**
     * @api {socket} "func:00" 设备注连
     * @apiName func:00
     * @apiGroup GlobalAPPSocket 
     * @apiDescription  App请求设备连接或注册并连接            
     * @apiUse SocketParam

       * @apiSuccessExample {json} Success-Response:
       *  {"state":200,"msg":"操作成功","servercode":"00","deviceid":"861933030013924","data":{"user":{"_id":"592809373a4c4a30f4d6c3a9","clientID":"47ec41b2a183782de20478e4fb8d381d","deviceID":"861933030013924","created":1495796023408,"__v":0}}}
     * @apiUse DeviceNotOnline
     */


	
	var self  = this;
	var deviceID = param.deviceid||param.deviceID;;
	var clientID = param.clientID || param.clientid;
	var func = param.func;


	//	console.log()


	 var userModel = UserModel.get();

	  var  query= userModel.find(
               {
                  clientID:clientID,
                  deviceID:deviceID,                
              });
               query.exec(function(err,data){

                 //

                  if (data.length  ==0) { 
                   console.log("socketerror resCodeNullUser")  
                     var socketdata = {
                        state:3000011,
                        msg:"操作成功 ",
                        servercode:func,
                        deviceid:deviceID,
                        data:{user:null}
                    }
              
                   TcpSocketAPIHandler.wirteToUser(deviceID,socketdata,socket)
                 
                  return;
                  }
                  else{


                   

	              //用户放入在线列表
		  	     OnlineUsersManager.addUser(data[0].toObject(),socket.id);

                      var u = data[0];
                      var socketdata = {
                        state:200,
                        msg:"操作成功",
                        servercode:func,
                        deviceid:deviceID,
                        data:{user:u}
                    }

		  	                    //寻找App对应的设备是否不是在线
                   if (OnlineUsersManager.getOnlineDevicesByDeviceId(deviceID)){
                    
            
                   TcpSocketAPIHandler.wirteToUser(deviceID,socketdata)


                   }
                   else{                         
                    TcpSocketAPIHandler.wirteToUserWhenDeviceNotOnLine(socket,func);                    	
                   }                       
                  		
                 }
             });


}



module["exports"] = new _00Handler();	