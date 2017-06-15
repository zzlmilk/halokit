var net = require('net') ;



var param01w = {
		  deviceid: "861933030013924", 
		  func: "01", 
		  content: "020617,114229,W,460,0:32790:31326:45|0:32790:331:42|0:32790:42412:32|0:32790:30183:29100,0.00,0.0,9,0,62"
		}



var devClinet = {
			
			deviceID:"861933030013924",
				
			init:function(){
				var port  = 3030 ;
					   var params = {					            
					              deviceID : this.deviceID,
					              func:"00"
					            };		
					   // var paramL = {
								//   deviceID: this.deviceID, 
								//   clientID: this.clientID,
								//   func: "05",
								//   content:"2"								  
								//  }	

				//api.halokit.cn
					 var client = net.connect({port: port,host:"api.halokit.cn"}, function() {

					 		// userstock  = appClient;
					 		
					 		client.write(JSON.stringify(params));  


							var oneSecond = 1000 * 20;
						
								setInterval(function() {								  
								  client.write(JSON.stringify(param01w));  
						
									  // setTimeout(function() {								  
									 	//  appClient.write(JSON.stringify(param3));  
											// }, oneSecond)
								}, oneSecond);

					 		 client.on('data',function(data){
					 		 	 	 
					 		 		 var data  = data.toString();  
					 		 		 console.log(data);

					 		 });
					 });

			},
			initDevice:function(){
					devClinet.init()
			}


}



var _ = require('lodash');


 if (_.isEmpty(rails)) {
 	console.log(rails)
 };

return;




var oneSecond = 1000 * 20;
var i = 0;
setInterval(function() {								  
 devClinet.init()
 i++
 console.log("times",i)
	  // setTimeout(function() {								  
	 	//  appClient.write(JSON.stringify(param3));  
			// }, oneSecond)
}, oneSecond);











