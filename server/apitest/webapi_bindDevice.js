var should = require('should');
var request = require('supertest');
var sha1 = require('sha1');

var app = require('../mainIO');


var Utils = require('../lib/utils');

var helper = require("../Test/helper");

//var username = "test" + global.getRandomStr() ;
describe('WEB API bind device', function () {
		// var params ={
		// clientID:global.getRandomStr(), //个推ID
  //       deviceID:global.getRandomStr(), //设备ID
  //       language:"String",
  //       deviceType : "String",
  //       appVersion : "String",
  //       pushToken:"pushToken"
        
		// }


params= { appVersion: '1.0.2',
  clientID: global.getRandomStr(),
  deviceID: '861933030028500',
  deviceType: 'android',
  language: 'CN' ,
  pushToken:"string",
  version :"2.0.0"
}
		
	describe('/device/bindDevice 绑定设备可以帮', function () {
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




	describe('/device/bindDevice 用户已经存在', function () {


				param2= { appVersion: '1.0.2',
				  clientID:"seSXa",
				  deviceID: '861933030028500',
				  deviceType: 'android',
				  language: 'CN' ,
				  pushToken:"string",
				  version :"2.0.0"
				}

				 it(' 返回30000013', function (done) {
			            request(app)
		                .post('/halokit/v1/device/bindDevice')
		                .send(param2)
		                .end(function (err, res) {
		    			if (err) {
		    				throw err;
		    			}    		
		    			 console.log(res.body)	
		                 res.body.should.have.property('code');
		                 res.body.code.should.equal(30000013);		                 		             
		                 done();

		            });
		            
		          });   

		});

		describe('/device/bindDevice 用户已经设备id不同，应该更新成功', function () {


				param7= { appVersion: '1.0.2',
				  clientID:"test",
				  deviceID: "861933030002059",
				  deviceType: 'android',
				  language: 'CN' ,
				  pushToken:"string",
				  version :"2.0.0"				}
				  

				 it('用户已经设备id不同，应该更新成功', function (done) {
			            request(app)
		                .post('/halokit/v1/device/bindDevice')
		                .send(param7)
		                .end(function (err, res) {
		    			if (err) {
		    				throw err;
		    			}    		
		    			 console.log(res.body)	
		                 res.body.should.have.property('code');
		                 res.body.code.should.equal(1);		                 		             
		                 done();

		            });
		            
		          });   

		});


		describe('/device/bindDevice 设备是非法 code ＝3000021', function () {
				param3= { appVersion: '1.0.2',
				  clientID:"test",
				  deviceID: global.getRandomStr(),
				  deviceType: 'android',
				  language: 'CN' ,
				  pushToken:"string",
				  version :"2.0.0"
				}

				 it('用户已经设备id不同，应该更新成功', function (done) {
			            request(app)
		                .post('/halokit/v1/device/bindDevice')
		                .send(param3)
		                .end(function (err, res) {
		    			if (err) {
		    				throw err;
		    			}    		
		    			 console.log(res.body)	
		                 res.body.should.have.property('code');
		                 res.body.code.should.equal(3000021);		                 		             
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