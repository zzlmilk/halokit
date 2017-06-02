var should = require('should');
var request = require('supertest');
var sha1 = require('sha1');

var app = require('../mainTest');


var Utils = require('../lib/utils');

var helper = require("./helper");

//var username = "test" + global.getRandomStr() ;
describe('Halo G3 ', function () {



		var params ={
    		clinetID:global.clientID, //个推ID
            deviceID:global.deviceid, //设备ID       
		}




        
        
		 describe(' halokit g3 get', function () {
				 it('Can get 24 g3 data', function (done) {
			            request(app)
		                .get('/sun/v1/halokit/24g3/'+ params.clinetID +"/"+params.deviceID)
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

		 // describe('/user/signin  Language', function () {
        
    //     it('Can  update Language', function (done) {
            
    //         var param = {
    //             clinetID:"String", //个推ID
    //             language : "en"
    //         };
                      
    //         request(app)
    //             .post('/sun/v1/user/updatelanguage')
    //             .send(param)
    //     		//.expect('Content-Type', /json/)
    //     		.expect(200) 
    //             .end(function (err, res) {

    // 			if (err) {
    // 				throw err;
    // 			}
    		

    //             res.body.should.have.property('code');
    //             res.body.code.should.equal(1);
    //             res.body.should.have.property('data');
    //             res.body.data.should.have.property('token');


    //             done();
            
            
    //         });   
            
    //     });
        
    // });


});

//注册








/*
describe('WEB User', function () {





}
*/