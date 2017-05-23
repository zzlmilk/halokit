var should = require('should'); 
var assert = require('assert'); 
var mongoose = require('mongoose');
var app = require('../mainTest');
var io = require('socket.io-client');

var helper = require("./helper");

var client = null;


describe('位置上报', function () {

     describe(' 硬件设备主动上传或盲点补传位置信息至通讯服务', function () {
 		
     	 it('01 硬件指令 A基站坐标.', function (done) {  

			    userSocketLogin(function(data){
			    var paramA = {
							  "deviceid": "861933030000001", 
							  "func": "01", 
							  "content": "300816,134652,A,-22.571707,-113.8613968,0.1,0.0,100,1000,50"
							}

					global.devicesocket.send(paramA);
			        global.devicesocket.on("message",function(data){ 
			         		console.log(data);    			        		
			        		done();
			        });


			    }); 	 
     	 				
    	 });

     });

//var paramW = {"deviceid":"861933030006506","func":"01","content":"220517,121833,W,460,0:6311:49539:31|0:6311:49507:13|0:6311:50161:12|0:6311:50177:5|0:6311:49937:3|0:6311:49537:3|0:6213:49267:380,0.00,0.0,9,532,10"}

//content": "300816,134652,A,-22.571707,-113.8613968,0.1,0.0,100,1000,50"
//content":" 220517,121833,W,460,0:6311:49539:31|0:6311:49507:13|0:6311:50161:12|0:6311:50177:5|0:6311:49937:3|0:6311:49537:3|0:6213:49267:380,0.00,0.0,9,532,10"}

});









