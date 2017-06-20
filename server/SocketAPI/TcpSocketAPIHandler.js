var Config = require("../lib/init");
var OnlineUsersManager = require('../lib/OnlineUsersManager');
var net  =require('net');
var Utils = require('../lib/utils');

var _ = require('lodash');


var log = require("../lib/log");
var Const = require("../lib/consts");


function paseJson (dataString,callBack){
	 var paramString = dataString.substr(1,dataString.length-2)
		//console.log(paramString)
 		paramString  =paramString.split(/\}\{/);

 		_.forEach(paramString,function(param){
 			
 			callBack("{"+param+"}");
 		})
}


var TcpSocketAPIHandler = {

		init:function(port){

		   var self = this;
     		//tcp 服务
     		
     		var tcpServer = net.createServer(function(socket) {
     		var io = null;	


     		
     			socket.setEncoding('utf8');

				var stockId =  Utils.getRandomStr(32);
				

				//预处理socket

				socket.id = stockId;
				socket.created = Utils.now();
				OnlineUsersManager.addConnection(socket);		

				 socket.on('data',function(param){

				 var paramString = param.toString('utf-8');
					
					 

				 paseJson(paramString,function(jsonString){

				 	try{

					param =  JSON.parse(jsonString);

					log.socket.info("[接收" + socket.remoteAddress+":"+ socket.remotePort + "]" + jsonString);
				}
				catch(e){
					console.log("JSON.parse err",jsonString)
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


				 })
    		
				});			
						



				// 断开连接事件
			    socket.on('close', function() {
			   	
			    	// 断开连接事件
			    	require('./DisconnectActionHandler').attach("close",socket);   

			    	//console.log("socket close");			    	
			    	//OnlineUsersManager.clearSocketBysocketId(socket.id)
			    	//socket.end();			 			        
			    });

			   

			    socket.on('error', function(error) {
			    	console.log("socket error",error);			    	
			    	require('./DisconnectActionHandler').attach("error",socket); 
			    	log.err.info("err" + error);
			    	//require('./DisconnectActionHandler').attach(socket);   

			    	// var  err = new Error(error);			    
			    	// console.log(err);
			    	//OnlineUsersManager.clearSocketBysocketId(socket.id)
			    	//socket.end()			        
			    });

			  //设置20分钟超时时间
			  var waitTime = 60*20;

			  socket.setTimeout(1000 * waitTime,function() {
			  console.log('客户端在' + waitTime + 's内未通信，将断开连接...');
			    		
			  });

			 //监听到超时事件，断开连接
			 socket.on('timeout', function() {
			 		 require('./DisconnectActionHandler').attach("timeout",socket);   
				    
				  });

			//	console.log('tcpServer listening on port ' + port + '!');

	   		});
				
			tcpServer.setMaxListeners = 0;
			tcpServer.listen(port);		

			
		},

		wirteToDevice:function(deviceID,param){
			var sessionId = OnlineUsersManager.getOnlineDevicesByDeviceId(deviceID);  


					
			  var index = _.findIndex(OnlineUsersManager.connections, function(socket) {

			  		if(socket) return socket.id == sessionId; else return false
			  });


			if (index>=0) {				
				 var socket =OnlineUsersManager.connections[index];	
				 try{
				 	console.log("Device socketID",socket.id)
				 	   OnlineUsersManager.connections[index].write(JSON.stringify(param));	
				 }
				 catch(err){
				 	console.log("wirteToDevice err",err)
				 }	 
			     
			     log.socket.info("[发送" + socket.remoteAddress+":"+ socket.remotePort + "]" + JSON.stringify(param));		 			 
			 }

		},
		wirteToUser:function(deviceID,param,socket_user){

			var userArray = OnlineUsersManager.getOnlineUsersByDeviceId(deviceID); 


			if (socket_user) {
					socket_user.write(JSON.stringify(param));
					 log.socket.info("[发送" + socket_user.remoteAddress+":"+ socket_user.remotePort + "]" + JSON.stringify(param));							    
			}else{	
				_.forEach(userArray,function(u){
					if (!u) {return}
						var index = _.findIndex(OnlineUsersManager.connections, function(socket) {
				  			if(socket) return socket.id == u.socketId; else return false
						  });	
						if (index>=0) {
							 var socket =OnlineUsersManager.connections[index];	
							 try{
							 		 console.log("User socketID",socket.id)
					 				 socket.write(JSON.stringify(param));	
					 				 							 		
							 }
							 catch(err){
 								console.log(err,"cannot send message."+err);
							 }

							 log.socket.info("[发送" + socket.remoteAddress+":"+ socket.remotePort + "]" + JSON.stringify(param));

										
						    
						}

				})

		}
	},

		wirteToUserWhenDeviceNotOnLine:function(deviceID,socket,func){
			
			
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