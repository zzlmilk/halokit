var socket = require('socket.io');
var express = require('express');
var http = require('http');

var Conf = require('./lib/init.js');




// initialization
var app = express();
var server = http.createServer(app);
var port = Conf.port;
var io = socket.listen(server);



var WebAPI = require('./WebAPI/WebAPIMain');
var SocketAPI = require('./SocketAPI/SocketAPIHandler');
var OnlineUsersManager = require('./lib/OnlineUsersManager');
var DatabaseManager = require('./lib/DatabaseManager');


var UserModel = require('./Models/User'); 


DatabaseManager.init(function(success){

	if (!success) {
		 console.log('Failed to connect DB');	
	}
	else{
		//app start
		//addUser()
		WebAPI.init(app);
		SocketAPI.init(io);
		OnlineUsersManager.init();

		 server.listen(Conf.port, function(){
            console.log('Server listening on port ' + Conf.port + '!');
        });

	}
	
});


var addUser = function(){
	 
	 var userModel = UserModel.get();

     var model = new userModel({
     		  username :"rex",
   			  telNumber : "15901794453",

     })

     model.save(function(err,result){
     		console.log(result)
     })




}