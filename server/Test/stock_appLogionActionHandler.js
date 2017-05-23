var should = require('should'); 
var assert = require('assert'); 
var mongoose = require('mongoose');
var app = require('../mainTest');
var io = require('socket.io-client');





describe('SOCKET', function () {

var socketURL = "http://localhost:8081/suntest";

var connectOptions ={
        transports: ['websocket'],
        'force new connection': true
    };



     describe(' App connect device  with deviceoffline', function () {

     	 it('connect device.', function (done) {


			     	 	var params = {
			                clientID : "String2",
			                deviceID : "12345",

			        	};


						 var client1 = io.connect(socketURL);						
						 client1.on('connect', function(data){
									  							
							client1.emit('connectdevice',params);
							 	
										                
						 	});

						  client1.on('apponline', function(data){
						 		console.log(data);
						 		data.should.have.property('code');
						 		data.code.should.equal(1);
						 		done();
						 });


						 client1.on('socketerror', function(data){
						 		data.should.have.property('code');
						 		data.code.should.equal(4000003);

						 		done();
						 });



     	 });

				

     });


       describe(' App connect device  with deviceonline', function () {

     	 it('connect device .', function (done) {


     	 		var deviceParam = {
			                deviceid : "12345",
			                func:"00"
			        	};

			        var client = io.connect(socketURL); 	

			         client.on('connect', function(data){
							
								client.send(deviceParam);								
								 										               
						 	});

			         client.on('message', function(data){							

						var params = {
			                clientID : "String2",
			                deviceID : "12345",

			        	};

						var client1 = io.connect(socketURL);

						 client1.on('connect', function(data){
						 	client1.emit('connectdevice',params);
						 });


						

						 client1.on('deviceonline',function(data){
						 		console.log("deviceonline");
						 		data.should.have.property('code');
						 		data.code.should.equal(1);
						 		done();
						 })





						 client1.on('socketerror', function(data){
						 		console.log(data);						 		
						 		//data.code.should.equal(1);
						 		data.should.have.property('code');

						 		done();
						 });



				});






     	 	



						



     	 });

				

     });




});






