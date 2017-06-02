var should = require('should');
var request = require('supertest');
var sha1 = require('sha1');

var app = require('../mainIO');


var Utils = require('../lib/utils');

var helper = require("../Test/helper");

//var username = "test" + global.getRandomStr() ;
describe('WEB API unbind device', function () {
		var params ={
		clientID:"47ec41b2a183782de20478e4fb8d381d", //个推ID
        deviceID:"861933030013924", //设备ID       
		}

		describe('/device/unbindDevice 解除设备绑定', function () {
				 it('Can  unbind', function (done) {
			            request(app)
		                .post('/halokit/v1/device/unbindDevice')
		                .send(params)
		                .end(function (err, res) {
		    			if (err) {
		    				throw err;
		    			}    		
		    			 console.log(res.body)	
		                 res.body.should.have.property('code');
		                 res.body.code.should.equal(1);
		                 res.body.should.have.property('data');
		              
		                 done();

		            });
		            
		          });   

		});









});

//注册








/*
describe('WEB User', function () {





}
*/