var should = require('should'); 
var assert = require('assert'); 
var mongoose = require('mongoose');
var app = require('../mainIO');

var helper = require("./helper");

 var net = require('net') ;



describe('电量推送', function () {


     describe(' 通讯服务主动推送硬件设备电量信息。', function () {
 		
     	 it('硬件 可以发08 指令 .', function (done) {  
     	 	

     	 		
			    userTcpSocketLogin(function(data){

			    var paramL = {
							  deviceid: global.deviceid, 							
							  func: "08", 
							  content:"25,1"
							 }

					 var oneSecond = 1000 * 1;
					setTimeout(function() {	
				global.devicesocket.write(JSON.stringify(paramL));
					}, oneSecond);		 
				

					global.usersocket.on("data",function(data){											
						 data = data.toString();
						
						 data =  JSON.parse(data);
					if (data.servercode == "08") {
							
							
							done();
						};

					});
					
			    }); 	 
     	 				
    	 });

     });

});









