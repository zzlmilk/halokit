var Config = require("../lib/init");
var OnlineUsersManager = require('../lib/OnlineUsersManager');


var SocketAPIHandler = {

		io:null,
		nsp:null,
		init:function(io){
				var self = this;
				this.io = io;
				this.nsp = io.of(Config.socketNameSpace);
	

		
				// this.nsp.on('connection',function(socket){						
				// 		  require('./AppActionHandler').attach(io,socket);
				// 		  require('./DeviceActionHandler').attach(io,socket);
				// });

				// this.nsp.on('disconnect',function(socket){						
				// 		  console.log("aaa");
				// });

				// this.nsp.on('anything', function(data) {
				// 	console.log(data);
				// })
				
		},


		emitToUser:function(deviceID,command,param){	

		var sessionId = OnlineUsersManager.getOnlineUsersByDeviceId(deviceID);  
		

        if(sessionId){        	
            this.nsp.to(sessionId).emit(command,param);
        	}
        	else{
        		console.log("no user sessionId" )
        	}
		},

		emitToDevice:function(deviceID,param){			
		var sessionId = OnlineUsersManager.getOnlineDevicesByDeviceId(deviceID);  
        if(sessionId){   
            this.nsp.to(sessionId).send(param);
        	}
        	else{
        		console.log("no Device sessionId" )
        	}
		}

}


module["exports"] = SocketAPIHandler;