var Config = require("../lib/init");
var OnlineUsersManager = require('../lib/OnlineUsersManager');


var SocketAPIHandler = {

		io:null,
		nsp:null,
		init:function(io){
				var self = this;
				this.io = io;
				this.nsp = io.of(Config.socketNameSpace);

				this.nsp.on('connection',function(socket){
						// console.log('connect',socket.id);
						  require('./AppActionHandler').attach(io,socket);
						  require('./DeviceActionHandler').attach(io,socket);
						 
				});

				
		},



		emitToUser:function(deviceID,command,param){	

		var sessionId = OnlineUsersManager.getOnlineUsersByDeviceId(deviceID);        

        if(sessionId){        	
            this.nsp.to(sessionId).emit(command,param);
        	}
		},

		emitToDevice:function(deviceID,param){			
		var sessionId = OnlineUsersManager.getOnlineDevicesByDeviceId(deviceID);  
        if(sessionId){   

            this.nsp.to(sessionId).send(param);
        	}
		}

}


module["exports"] = SocketAPIHandler;