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

var DisconnectActionHandler = function(){
	    	

}





//socket close or timeout 调用
DisconnectActionHandler.prototype.attach = function(whyDisconnect,socket){

		var self = this;

		console.log("whyDisconnect: "+whyDisconnect,socket.id)



		OnlineUsersManager.removeConnection(socket);
		OnlineUsersManager.removeUser(socket);

		
		

		//delete OnlineUsersManager.connections[index];


		// var index_socketId = _.findIndex(OnlineUsersManager.users,function(user){
		// 		 return  user.socketId == socket.id
		// })

		// delete OnlineUsersManager.users[index_socketId];



	 // OnlineUsersManager.removeUser(socket.id);
}




module["exports"] = new DisconnectActionHandler();



