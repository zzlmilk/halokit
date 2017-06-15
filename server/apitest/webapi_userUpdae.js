var should = require('should');
var request = require('supertest');
var sha1 = require('sha1');

var app = require('../mainIO');


var Utils = require('../lib/utils');

var helper = require("../Test/helper");

//var username = "test" + global.getRandomStr() ;
describe('WEB API user update', function () {
		var params ={
		clientID:global.clientID, //个推ID
        deviceID:global.getRandomStr(), //设备ID
        //language:"String 222",
        uuid : "String",
        deviceType : "String",
        appVersion : "String",
        pushToken:"pushToken"
        
		}
		
		describe('user/update 更新用户', function () {
				 it('Can bind', function (done) {
			            request(app)
		                .post('/halokit/v1/user/update')
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