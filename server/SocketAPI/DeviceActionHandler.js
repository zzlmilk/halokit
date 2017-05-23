var express = require('express');
var router = express.Router();
var _ = require('lodash');
var async = require('async');

var Const = require("../lib/consts");
var Config = require("../lib/init");
var Utils = require('../lib/utils');

var DeviceModel = require('../Models/Device');

var OnlineUsersManager = require('../lib/OnlineUsersManager');


var UserModel = require('../Models/User');

var DeviceActionHandler = function(){
	    
}




DeviceActionHandler.prototype.attach = function(io,socket){


  socket.on('message',function(param){
        var func = param.func;
        var deviceID = param.deviceid || param.deviceID;




         if(_.isEmpty(func)){            
            console.log('err',"no func ");
              
            socket.emit('socketerror', {code:Const.resCodeSocketDeviceNoFunc});               
            return;
        }



          if(_.isEmpty(deviceID)){            
            console.log('err',"no deviceID ");              
            socket.emit('socketerror', {code:Const.resCodeSocketDeviceNoFunc});               
            return;
        }


        
        
        switch(func)
        { 
            case Const.halokitOrderConnect:            
            require('./HalokitDeviceHandler/_00Handler').attach(param,socket,io);
            break;



            case  "01":
            require('./HalokitDeviceHandler/_01Handler').attach(param,socket,io);
            break;  


             case "1C":             
             require('./HalokitDeviceHandler/_1CHandler').attach(param,socket,io);
             break;

            case "0B":             
             require('./HalokitDeviceHandler/_0BHandler').attach(param,socket,io);
             break;             

             case "08":             
             require('./HalokitDeviceHandler/_08Handler').attach(param,socket,io);
             break;

             case "19":             
             require('./HalokitDeviceHandler/_19Handler').attach(param,socket,io);
             break;

             case "06":  
             require('./HalokitDeviceHandler/_06Handler').attach(param,socket,io);
             break;

             case "10":   
             require('./HalokitDeviceHandler/_10Handler').attach(param,socket,io);
             break;                          



            default:
             
             console.log('err',"unknow func ",func);

        }

  });

	
}





module["exports"] = new DeviceActionHandler();	