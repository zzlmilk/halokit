var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var util = require('util');
var helper = require("./helper");


describe('WEB Conversation', function () {

	describe('/message/send POST', function () {

		  it('Can send message', function (done) {

		  	 signin(function(token,data){

                 login_id = data.user._id
		  	 	 userID = data.user._id;             
		  	 		var params = {                    
                    userID : userID,
                    fromID:"591aa040aea91f3aec3d47aa",
                    message:"hello"
                };	

				request(app)
                .post('/sun/v1/message/send')
                .send(params)
        		.expect('Content-Type', /json/)
        		.expect(200)
                .set('Access-Token', token)
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

      describe('/message/list GET', function () {
         it('Get message list works', function (done) {

                signin(function(token,data){
                    request(app)            
                    .get('/sun/v1/message/list/'+ data.user._id+'/591aa040aea91f3aec3d47aa')
                    .expect(200) 
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

});

