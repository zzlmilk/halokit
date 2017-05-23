var express = require('express');
var router = express.Router();
var _ = require('lodash');
var async = require('async');

var Const = require("../lib/consts");
var Config = require("../lib/init");
var Utils = require('../lib/utils');

var OnlineUsersManager = require('../lib/OnlineUsersManager');

var SocketAPIHandler = require('./SocketAPIHandler');


var UserModel = require('../Models/User');

var AppActionHandler = function(){
	    

}



AppActionHandler.prototype.attach = function(io,socket){


	 socket.on('connectdevice', function(param){

	 	 var clientID = param.clientID;
     var deviceID = param.deviceID;
	 	// console.log('join called',param);

	 	  if(_.isEmpty(clientID)){
            
            console.log('err',"no clinetID id");
              
            socket.emit('socketerror', {code:Const.resCodeSocketAppNoclinetID});               
            return;
        }

          if(_.isEmpty(deviceID)  ){
            
            console.log('err',"no deviceID id");
              
            socket.emit('socketerror', {code:Const.resCodeSocketLoginNodeviceID});               
            return;
        }
          
          var userModel = UserModel.get();
          var  query= userModel.find(
               {
                  clientID:clientID,
                  deviceID:deviceID,                
              });

               query.exec(function(err,data){
                  if (data.length  ==0) {
                  socket.emit('socketerror', {code:Const.resCodeNullUser});               
                  return;
                  }
                  else{


                 //设置在线用户与stock关联
                   OnlineUsersManager.addUser(data[0].toObject(),socket.id);
                                    
                   //寻找App对应的设备是否不是在线
                   if (OnlineUsersManager.getOnlineDevicesByDeviceId(deviceID)){

                       socket.emit('deviceonline', {code:Const.resCodeSocketAppConnectDeviceSuccee}); 

                   }
                   else{

                      socket.emit('socketerror', {code:Const.resCodeSocketDeviceNotOnline});
                   }
                                            
                  } 



              });

	 });


   socket.on('light', function(param){

     var clientID = param.clientID;
     var deviceID = param.deviceID || param.deviceid;

    // console.log('join called',param);

      if(_.isEmpty(clientID)){
            
            console.log('err',"no clinetID id");
              
            socket.emit('socketerror', {code:Const.resCodeSocketAppNoclinetID});               
            return;
        }

          if(_.isEmpty(deviceID)  ){
            
            console.log('err',"no deviceID id");
              
            socket.emit('socketerror', {code:Const.resCodeSocketLoginNodeviceID});               
            return;
        }



        SocketAPIHandler.emitToDevice(deviceID,param);



   });


}






module["exports"] = new AppActionHandler();	