var should = require('should'); 
var assert = require('assert'); 
var mongoose = require('mongoose');
var app = require('../mainTest');
var io = require('socket.io-client');

var helper = require("./helper");

var client = null;


describe('AGPS', function () {

     describe(' 硬件设备主动向通讯服务获取AGPS', function () {
 		
     	 it('1C 硬件指令.', function (done) {     
			    userSocketLogin(function(data){
			    	var params = {"deviceid":global.deviceid,"func":"19"}
					global.devicesocket.send(params);
			        global.devicesocket.on("message",function(data){ 
			  		
			        done();
			        });
			    }); 	 
     	 				
    	 });


     });



});









