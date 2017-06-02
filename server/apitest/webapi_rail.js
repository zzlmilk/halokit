var should = require('should');
var request = require('supertest');
var sha1 = require('sha1');

var app = require('../mainIO');


var Utils = require('../lib/utils');

var helper = require("../Test/helper");


describe('WEB API bind device', function () {


		var params ={
		clientID:"47ec41b2a183782de20478e4fb8d381d", //个推ID
        deviceID:"861933030013924", //设备ID
        longitude:"0",
        latitude:"0",
        radius:"50"
		}

		describe('/user/rail 创建电子围栏', function () {
				 it('Can create', function (done) {
			            request(app)
		                .post('/halokit/v1/user/rail/create')
		                .send(params)
		                .end(function (err, res) {
		    			if (err) {
		    				throw err;
		    			}    		
		    			
		                 res.body.should.have.property('code');
		                 res.body.code.should.equal(1);
		                 res.body.should.have.property('data');
		              
		                 done();

		            });
		            
		          });   

		});

		describe('/user/rail 更新电子围栏', function () {
				 it('Can update', function (done) {
			            request(app)
		                .post('/halokit/v1/user/rail/update')
		                .send(params)
		                .end(function (err, res) {
		    			if (err) {
		    				throw err;
		    			}    		
		    			
		                 res.body.should.have.property('code');
		                 res.body.code.should.equal(1);
		                 res.body.should.have.property('data');
		              
		                 done();

		            });
		            
		          });   

		});

		describe('/user/rail 查询电子围栏', function () {
				 it('Can getRail', function (done) {
			            request(app)
		                .get('/halokit/v1/user/rail/getRail')
		                .send(params)
		                .end(function (err, res) {
		    			if (err) {
		    				throw err;
		    			}    		
		    			
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