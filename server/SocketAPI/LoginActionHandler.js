var express = require('express');
var router = express.Router();
var _ = require('lodash');
var async = require('async');

var Const = require("../lib/consts");
var Config = require("../lib/init");
var Utils = require('../lib/utils');

var OnlineUsersManager = require('../lib/OnlineUsersManager');


var UserModel = require('../Models/User');

var LoginActionHandler = function(){
	    
}


LoginActionHandler.prototype.attach = function(io,socket){

	var users = [];

	 socket.on('join', function(param){

	 	 var userId = param.userID;

	 	 //console.log('join called',param);



	 	  if(_.isEmpty(userId)){
            
            console.log('err',"no user id");
              
            socket.emit('socketerror', {code:Const.resCodeSocketLoginNoUserID});               
            return;
        }


         // socket.emit('newUser', param);


            var userModel = UserModel.get();
                
            UserModel.getUserById(userId,function(result){          
                if(!result)
                    return;

                
                OnlineUsersManager.addUser(result.toObject(),socket.id);
               
              
                });


      
        
       // OnlineUsersManager.addUser(user,socket.id);
       // var users = OnlineUsersManager.users;
       
               

	 });
}


module["exports"] = new LoginActionHandler();	