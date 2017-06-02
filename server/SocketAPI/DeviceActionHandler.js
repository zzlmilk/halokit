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




DeviceActionHandler.prototype.attach = function(param,socket){

    
         
        var func = param.func;
        var deviceID = param.deviceid || param.deviceID;
        var clientID = param.clientID || param.clientid;

        param.deviceID = deviceID;
        param.clientID = clientID;
         
        
         if(!_.isEmpty(clientID)){
            console.log('err',"have clientID ");
            socket.write('socketerror: have clientID');                               
         }


        if(_.isEmpty(deviceID)){            
            console.log('err',"no deviceID ");              
            socket.write('socketerror:no deviceID');               
            return;
        }


         if(_.isEmpty(func)){            
            console.log('err',"no func ");              
            socket.write("socketerror:no func");               
            return;
        }




        var io = null;
        
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
            socket.write("socketerror:unknow func");   

        }



	
}





module["exports"] = new DeviceActionHandler();	