var should = require('should'); 
var assert = require('assert'); 
var mongoose = require('mongoose');
var app = require('../mainIO');




var helper = require("./helper");
var OnlineUsersManager = require('../lib/OnlineUsersManager');





describe('APGS ', function () {

     describe(' 硬件向服务器获取agps数据。', function () {
 		
     	 it('硬件 发19 指令 .', function (done) {  
     	 		
			    userTcpSocketLogin(function(data){

			    var paramL = {
							  deviceid: global.deviceid, 							
							  func: "19", 							  
							 }


				 var oneSecond = 1000 * 1;
					setTimeout(function() {	
							global.devicesocket.write(JSON.stringify(paramL));
					}, oneSecond);


						global.devicesocket.on("data",function(data){
								 data = data.toString();
								 data =  JSON.parse(data);
								
								 if (data.func = "19") {								 	 	
								 		done();
								 };
						})
					
			
						//done();
			    }); 	 
     	 				
    	 });

     });

});









