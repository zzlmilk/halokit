var should = require('should');
var request = require('supertest');
var sha1 = require('sha1');

var app = require('../mainTest');


var Utils = require('../lib/utils');

var helper = require("./helper");

//var username = "test" + global.getRandomStr() ;
describe('WEB User', function () {

console.log(global.username1)

var password = "rex123";



		var params ={
		clinetID:"String2", //个推ID
        deviceID:"String", //设备ID
        language:"String",
        uuid : "String",
        deviceType : "String",
        appVersion : "String",

		}

		 describe('/user/signup Post', function () {
				 it('Can signup', function (done) {
			            request(app)
		                .post('/sun/v1/user/signup')
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