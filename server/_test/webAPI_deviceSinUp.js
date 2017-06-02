var should = require('should');
var request = require('supertest');
var sha1 = require('sha1');

var app = require('../mainTest');


var Utils = require('../lib/utils');

var helper = require("./helper");

//var username = "test" + global.getRandomStr() ;
describe('WEB Device', function () {

		var params ={	
        deviceID:global.getRandomStr(), //设备ID
		}

		describe('/device/signup ', function () {
				 it('Can signup', function (done) {
			            request(app)
		                .post('/sun/v1/device/signup')
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