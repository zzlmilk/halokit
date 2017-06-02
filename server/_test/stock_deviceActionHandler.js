var should = require('should'); 
var assert = require('assert'); 
var mongoose = require('mongoose');
var app = require('../mainTest');
var io = require('socket.io-client');

var helper = require("./helper");

var client = null;


describe('SOCKET Device', function () {

var socketURL = "http://localhost:8081/suntest";

var connectOptions ={
        transports: ['websocket'],
        'force new connection': true
    };



    
   //   describe(' 连接 device connect ', function () {
   //   	 it('can func 00.', function (done) {     	 		
			//      	 	var params = {
			//                 deviceid : global.deviceid,
			//                 func:"00"
			//         	};

			// 			 var client1 = io.connect(socketURL);

						
			// 			 client1.on('connect', function(data){
							
			// 					client1.send(params);

			// 					client = client1;	
								
								 										               
			// 			 	});


			// 			 client1.on('message', function(data){							 							
								

			// 					if (data.content == "1") {
			// 							done();
									
			// 					};

															 										               
			// 			 	});


			// 			 client1.on('socketerror', function(data){
			// 			 		console.log(data);						 		
			// 			 		//data.code.should.equal(1);
			// 			 		data.should.have.property('code');

			// 			 		done();

			// 			 });

   //   	 });

			
   //   });



   //   describe('  device 离线上报 ', function () {

   //   	 it('can 离线上报', function (done) {

	 	// 	var params = {
	  //               deviceid : global.deviceid,
	  //               func:"1C"
	  //       	};

			// client.send(params);

   //   	 	client.on("message",function(data){     	 	
   //   	 		done();
   //   	 	});

   //   	 });
	
   //   });



   //     describe('  device 离线成功后 ，通知用户下线 ', function () {

   //   	 it('can 通知用户下线', function (done) {

			// userSocketLogin(function(data){

			//  	var params = {
			//                 deviceid : "12345",
			//                 func:"1C"
			//         	};


			//         global.devicesocket.send(params);
		 //     	 	global.devicesocket.on("message",function(data){     	
		     	   	
		 //     	 			global.usersocket.on("deviceonlineoff",function(data){
		 //     	 				data.code.should.equal(1);
			// 			 		data.should.have.property('code');
		 //     	 					done();
		 //     	 			}) 

			// 		})

	
   //   	 	});


   //   	 });
	
   //   });




});






