var should = require('should');
var request = require('supertest');
var sha1 = require('sha1');

var app = require('../mainIO');


var Utils = require('../lib/utils');

var helper = require("../Test/helper");

//var username = "test" + global.getRandomStr() ;
describe('WEB API bind device', function () {
		var params ={
		clientID:"test1", //个推ID
        deviceID:"861933030013924", //设备ID
        language:"String",
        uuid : "String",
        deviceType : "String",
        appVersion : "String",

		}
		
		describe('/device/bindDevice 绑定设备', function () {
				 it('Can bind', function (done) {
			            request(app)
		                .post('/halokit/v1/device/bindDevice')
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