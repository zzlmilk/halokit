var net = require('net') ;





var appClinet = {
			userstock:null,
			 

			init:function(){
				var port  = 3030 ;

					   var params = {
					              clientID :this.clientID ,
					              deviceID : this.deviceID,
					              func:"00"
					            };		
					   var paramL = {
								  deviceID: this.deviceID, 
								  clientID: this.clientID,
								  func: "08",
								  //content:"2"								  
								 }	
					 		
					 var appClient = net.connect({port: port,host:"api.halokit.cn"}, function() {

					 		userstock  = appClient;
					 		
					 		appClient.write(JSON.stringify(params));  
					 		
							var oneSecond = 1000 * 1;					
								setTimeout(function() {								  
								  appClient.write(JSON.stringify(paramL));  
						
									  // setTimeout(function() {								  
									 	//  appClient.write(JSON.stringify(param3));  
											// }, oneSecond);

								}, oneSecond);

					 		 appClient.on('data',function(data){
					 		 	 	 
					 		 		 
					 		 		 var data  = data.toString();  
					 		 		 console.log(data);

					 		 });
					 });

			},

			_01:function(){

			    var paramL = {
							  deviceid: this.deviceID, 
							  clientID: this.clientID,
							  func: "01", 
							}	
					this.userstock.write(JSON.stringify(paramL));  
					this.userstock.on('data',function(){
									 var data  = data.toString();  
					 		 		 console.log(data);
					})

			}


}



appClinet.init()















