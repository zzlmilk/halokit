var should = require('should');
var request = require('supertest');
var app = require('../mainTest');

var helper = require("./helper");



describe('WEB Search', function () {
  describe('/search/user GET', function () {
  		it('can find user without keyword', function (done) {
  				signin(function(token){
  					
  					request(app)
                    .get('/sun/v1/search/user/15901794453')
                    .set('Access-Token', token)
                    .end(function (err, res) {
        			if (err) {
        				throw err;
        			}        			      
        			//console.log(res.body)  			
                    res.body.should.have.property('code');
                    res.body.code.should.equal(1);
                    res.body.should.have.property('data');	                   
                    done();

  				});

  		});

  });

});

});
	