var should = require('should'); 
var assert = require('assert'); 
var mongoose = require('mongoose');
//var app = require('../mainIO');

var helper = require("./helper");

 var net = require('net') ;

var OnlineUsersManager = require('../lib/OnlineUsersManager');



describe('位置上报', function () {


     describe(' App 主动问服务器要位置信息', function () {
 		
     	 it('05 app指令 .', function (done) {  
     	 		
			    userTcpSocketLogin(function(data){
			    var paramL = {
							  deviceid: global.deviceid, 
							  clientID:global.clientID,
							  func: "05", 
							  content:"2"
							}


				var oneSecond = 1000 * 1;
					setTimeout(function() {							
						global.usersocket.write(JSON.stringify(paramL))
					}, oneSecond);


			
					global.usersocket.on("data",function(data){
							data =  JSON.parse(data);
					 	if (data.servercode == "10") {					 		
					 		//global.devicesocket.end();
					 		done();
					 	}

					})



					 global.devicesocket.on("data",function(data){	

					 	data =  JSON.parse(data);
					 	console.log(data)
					 		if (data.func == "05") {		
						 		var param = {
								  deviceid: global.deviceid, 
								  func: "10", 
								  content: "04"
								}
								global.devicesocket.write(JSON.stringify(param));

					 		}
					 
					 });				

					// 	 data = data.toString();
					// 	 data =  JSON.parse(data);

					
							
					// 		global.devicesocket.write(JSON.stringify(param));
							
					// 	};


					// });
					
					// global.usersocket.on("data",function(data){

					// 	data = data.toString();
					// 	data =  JSON.parse(data);
					// 	if (data.servercode =="01") {
					// 		//	console.log(data)
					// 			 //data.should.have.property('code');
					// 			  //data.code.should.equal(4000003);
					// 			  done();
					// 	};
						
		                
							
					// })

			    }); 	 
     	 				
    	 });

     });

});









