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



AppActionHandler.prototype.attach = function(param,socket){




        var func = param.func;
        var deviceID = param.deviceid || param.deviceID;
        var clientID = param.clientID || param.clientid;


         if(_.isEmpty(clientID)){
            console.log('err',"no clientID ");            
            socket.write('{socketerror: no clientID}');                               
         }


        if(_.isEmpty(deviceID)){            
            console.log('err',"no deviceID ");              
            socket.write('{socketerror:no deviceID}');               
            return;
        }

         if(_.isEmpty(func)){            
            console.log('err',"no func ");              
            socket.write("{socketerror:no func}");               
            return;
        }

        var io = null;
        switch(func)
        { 
            case Const.halokitOrderConnect:            
            require('./HalokitAppHandler/_00Handler').attach(param,socket,io);
            break;


            case  "01":
            require('./HalokitAppHandler/_01Handler').attach(param,socket,io);
            break;  


             case "03":             
             require('./HalokitAppHandler/_03Handler').attach(param,socket,io);
             break;

             case "05":             
             require('./HalokitAppHandler/_05Handler').attach(param,socket,io);
             break;             

             case "08":             
             require('./HalokitAppHandler/_08Handler').attach(param,socket,io);
             break;

             case "19":             
             require('./HalokitAppHandler/_19Handler').attach(param,socket,io);
             break;

             case "06":  
             require('./HalokitAppHandler/_06Handler').attach(param,socket,io);
             break;

             case "10":   
             require('./HalokitDeviceHandler/_10Handler').attach(param,socket,io);
             break;                          


             default:             
             console.log('err',"unknow func ",func);
             socket.write("socketerror:unknow func");   

        }








	 socket.on('connectdevice', function(param){
    

	 	 var clientID = param.clientID;
     var deviceID = param.deviceID;
	 	// console.log('join called',param);


          
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




     socket.on('findlocation', function(param){

     var clientID = param.clientID;
     var deviceID = param.deviceID || param.deviceid;

      console.log(param)

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