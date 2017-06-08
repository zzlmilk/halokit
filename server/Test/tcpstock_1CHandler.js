

var should = require('should'); 
var assert = require('assert'); 
var mongoose = require('mongoose');
var app = require('../mainIO');

var helper = require("./helper");



describe('Tcp Stock  设备离线上报', function () {

	describe(' 硬件设备离线时主动上报离线状态至通讯服务 ', function () {
	
		it('can func 1C.', function (done) {     	
				
			    userTcpSocketLogin(function(data){

			    var paramL = {
							  deviceid: global.deviceid, 							
							  func: "1C", 
							  
							 }


				var oneSecond = 1000 * 1;
					setTimeout(function() {	
				global.devicesocket.write(JSON.stringify(paramL));
					}, oneSecond);
					

					global.devicesocket.on("data",function(data){											
						 data = data.toString();
						// console.log(data)
						 data =  JSON.parse(data);
						 
						 
					if (data.func == "1C") {
							//global.devicesocket.write(JSON.stringify(param));
							//global.usersocket.end();
							global.devicesocket.end();
							done();
						};


					});
					
	

			    }); 					

			});
	});

});