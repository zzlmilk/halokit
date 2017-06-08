var should = require('should');
var request = require('supertest');
var sha1 = require('sha1');

var app = require('../mainIO');


var Utils = require('../lib/utils');

var helper = require("../Test/helper");


describe('WEB API 24轨迹', function () {

	var params ={
		clientID:"test", //个推ID
        deviceID:"861933030006506", //设备ID
       
		}

	describe('halokit/24g3 查询24小时轨迹', function () {


				 it('Can getRail', function (done) {
			            request(app)
		                .get('/halokit/v1/halokit/24g3')
		                .query(params)
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

