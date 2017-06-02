var bodyParser = require("body-parser");
var path = require('path');
var _ = require('lodash');

var Const = require("../lib/consts");
var Config = require("../lib/init");
var Utils = require('../lib/utils');


var SocketHandlerBase = function(){
    
}


SocketHandlerBase.prototype.successResponse = function(code,func,msg,data){
    
    	var socketdata  = {
                  			state : code ,
                  			servercode:func,
                  			data :data,
                  			messgae:msg
                  			
                  	   }

                 return socketdata;
   	
}

SocketHandlerBase.prototype.successWrite = function(func,deviceid,content){
    
    	var socketdata  = {
                  			func : func ,
                  			deviceid:deviceid,
                  			content :content,                  			                  		
                  	   }

                 return socketdata;
   	
}

SocketHandlerBase.prototype.errorResponse = function(code,data){
    	
    

}

module["exports"] = SocketHandlerBase;

