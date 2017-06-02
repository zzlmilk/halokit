var should = require('should'); 
var assert = require('assert'); 
var mongoose = require('mongoose');
var app = require('../mainIO');

 var net = require('net') ;

var helper = require("./helper");



describe('Tcp Stock App 设备注网 设备不在线', function () {

	describe(' 指令00 App请求设备连接或注册并连接 设备不在线 ', function () {
	
		it('can func 00.', function (done) {     	

				var params = {
								clientid:global.clientID,
				                deviceid :global.deviceid,
				                func:"00",				                
			        	};
			     		

			      	var client = net.connect({port: 3030}, function() {
   							client.write(JSON.stringify(params));   


						}); 

			      	



   						client.on('data',function(data){	

						var data  = data.toString();	
																				
						 data = JSON.parse(data);
								 						
						  data.should.have.property('state');
		                  data.state.should.equal(4000003);
		                									
						  done();

					}) 		


	
			})



	})

});

describe('Tcp Stock Device 设备注网 ', function () {

	describe(' 指令00 硬件设备主动向通讯服务申请设备注网 ', function () {
	
		it('can func 00.', function (done) {     	

				var params = {
				                "deviceid" : "861933030006506" ,
				                func:"00"
			        	};
			     	
			      	var client = net.connect({port: 3030}, function() {
   							client.write(JSON.stringify(params));   					
						}); 

						client.on('data',function(data){
								var data  = data.toString();
								 data = JSON.parse(data);
						

						  data.should.have.property('func');
						  data.should.have.property('content');
		                  data.content.should.equal("1");
		                									
						done();

						}) 			
		})



	})

});





describe('Tcp Stock App 设备注网 设备在线', function () {

	describe(' 指令00 App请求设备连接或注册并连接 设备在线 ', function () {
	
		it('can func 00.', function (done) {     	
					 global.userTcpSocketLogin(function(data){
					 	 data.should.have.property('state');
		                  data.state.should.equal(200);
					 		done();
					 })
					
			})

	})

});





