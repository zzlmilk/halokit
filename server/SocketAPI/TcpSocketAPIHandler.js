var Config = require("../lib/init");
var OnlineUsersManager = require('../lib/OnlineUsersManager');
var net  =require('net');
var Utils = require('../lib/utils');

var _ = require('lodash');


var log = require("../lib/log");
var Const = require("../lib/consts");



var TcpSocketAPIHandler = {

		init:function(port){

		   var self = this;
     		//tcp 服务
     		 
     		
     		var tcpServer = net.createServer(function(socket) {
     		var io = null;
     			
		//log.socket.info("[建立连接");
				//socket.destroy()
     			socket.setEncoding('utf8');

				var stockId =  Utils.getRandomStr(32);
				socket.id = stockId;


				OnlineUsersManager.addConnection(socket);

				  socket.on('data',function(param){


				 var paramString = param.toString('utf-8');
						

					 try {

        				param =  JSON.parse(paramString);
        				
        				log.socket.info("[接收" + socket.remoteAddress+":"+ socket.remotePort + "]" + paramString);
        					 
   					 }
   					 catch(e){
   					 		//log.socket.info("[接收" + socket.remoteAddress+":"+ socket.remotePort + "]" + param.toString());
   					 		//console.log(e);	
   					 		//socket.destroy();   					 	  						 		
			   //log.socket.info("[接收" + socket.remoteAddress+":"+ socket.remotePort + "]" + param.toString());
					 		return;
   					 }

					var func = param.func;
			        var deviceID = param.deviceid || param.deviceID;
			        var clientID = param.clientID || param.clientid;

			        if(!_.isEmpty(clientID)){
			        	 
           				 	require('./AppActionHandler').attach(param,socket);                             
        				 }

        				else{
        					
        					require('./DeviceActionHandler').attach(param,socket);
        				}
        				

				});			
						
				// 断开连接事件
			    socket.on('close', function(conn) {
			    	console.log(conn)
			    	//console.log("socket close");			    	
			    	//OnlineUsersManager.clearSocketBysocketId(socket.id)
			    	//socket.end();			 			        
			    });

			    	
			    socket.on('error', function(error) {
			    	console.log("socket error",error);
			    	log.err.info("err" + error);


			    	// var  err = new Error(error);			    
			    	// console.log(err);
			    	//OnlineUsersManager.clearSocketBysocketId(socket.id)
			    	//socket.end()
			        
			    });

				//设置超时时间
			  var waitTime = 60*15;
			  socket.setTimeout(1000 * waitTime,function() {
			  console.log('客户端在' + waitTime + 's内未通信，将断开连接...');
			    	
			  });

			 //监听到超时事件，断开连接
			 socket.on('timeout', function() {
			 		 console.log("socket timeout");
				     //OnlineUsersManager.clearSocketBysocketId(socket.id)
				     //socket.end();
				  });

			//	console.log('tcpServer listening on port ' + port + '!');

	   		});
				
			tcpServer.setMaxListeners = 0;
			tcpServer.listen(3030);		

			
		},

		wirteToDevice:function(deviceID,param){
			var sessionId = OnlineUsersManager.getOnlineDevicesByDeviceId(deviceID);  
					
			  var index = _.findIndex(OnlineUsersManager.connections, function(socket) {
			  		if(socket) return socket.id == sessionId; else return false
			  });


			if (index>=0) {				
				 var socket =OnlineUsersManager.connections[index];				 
			     OnlineUsersManager.connections[index].write(JSON.stringify(param));	
			     log.socket.info("[发送" + socket.remoteAddress+":"+ socket.remotePort + "]" + JSON.stringify(param));		 			 
			 }

		},
		wirteToUser:function(deviceID,param,socket_user){
			var sessionId = OnlineUsersManager.getOnlineUsersByDeviceId(deviceID); 		
			var index = _.findIndex(OnlineUsersManager.connections, function(socket) {
			  		if(socket) return socket.id == sessionId; else return false
			  });	


			if (socket_user) {
					socket_user.write(JSON.stringify(param));
					 log.socket.info("[发送" + socket_user.remoteAddress+":"+ socket_user.remotePort + "]" + JSON.stringify(param));							    
			}else{

			  if (index>=0) {	
			     var socket =OnlineUsersManager.connections[index];	
				 socket.write(JSON.stringify(param));				
			     log.socket.info("[发送" + socket.remoteAddress+":"+ socket.remotePort + "]" + JSON.stringify(param));							    
		}	
			}
	},
		wirteToUserWhenDeviceNotOnLine:function(socket,func){
				var socketdata  = {
                  			state : Const.resCodeSocketDeviceNotOnline ,
                  			servercode:func,
                  			data :null,
                  			deviceid:null,
                  			msg:"resCodeSocketDeviceNotOnline"                  			
                  	  }                 
                  socket.write(JSON.stringify(socketdata));
                  log.socket.info("[发送" + socket.remoteAddress+":"+ socket.remotePort + "]" + JSON.stringify(socketdata));                  
                   //socket.end();
		},


}




module["exports"] = TcpSocketAPIHandler;