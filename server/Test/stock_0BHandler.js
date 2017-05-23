var should = require('should'); 
var assert = require('assert'); 
var mongoose = require('mongoose');
var app = require('../mainTest');
var io = require('socket.io-client');

var helper = require("./helper");

var client = null;


describe('SOCKET', function () {

     describe(' 时间同步', function () {
 		
     	 it('0B 硬件指令.', function (done) {     
			    userSocketLogin(function(data){
			    	var params = {"deviceid":global.deviceid,"func":"0B"}
					global.devicesocket.send(params);
			        global.devicesocket.on("message",function(data){ 
			         		console.log(data);    			        		
			        		done();
			        });


			    }); 	 
     	 				
    	 });



     });




});









