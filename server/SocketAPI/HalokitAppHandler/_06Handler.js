var OnlineUsersManager = require('../../lib/OnlineUsersManager');
var DeviceModel = require('../../Models/Device');
var UserModel = require('../../Models/User');

var _ = require('lodash');

var SocketHandlerBase = require('../SocketHandlerBase');
var Utils = require('../../lib/utils');
var Const = require("../../lib/consts");



var TcpSocketAPIHandler = require('../TcpSocketAPIHandler');




var _06Handler = function(){
    
}

_.extend(_06Handler.prototype,SocketHandlerBase.prototype);





 _06Handler.prototype.attach = function(param,socket,io) {
 	// body...


      /**
     * @api {socket} "func:06"  灯光控制
     * @apiName func:06
     * @apiGroup GlobalAPPSocket 
     * @apiDescription  App请求设备硬件设备设置灯光模式和灯光颜色         
     * @apiUse SocketParam
     * @apiParam {String} content  0/空:常亮 1:呼吸灯 2:报警灯


       * @apiSuccessExample {json} Success-Response:
       *  {resonse:"硬件设备接收并成功设置后通过d-s FUNC:10（响应设置） 上报设置成功信息""}
     * @apiUse DeviceNotOnline
     */

     
	var self  = this;
	var deviceID = param.deviceid||param.deviceID;;
	var clientID = param.clientID || param.clientid;
	var func = param.func;
  var content = param.content;


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
                     TcpSocketAPIHandler.wirteToUserWhenDeviceNotOnLine(socket,func);                                          
                   }                       
                  		
                 }
             });


}


module["exports"] = new _06Handler();	


