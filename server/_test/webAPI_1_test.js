var should = require('should');
var request = require('supertest');
var app = require('../mainTest');


describe('WEB', function () {

    var req, res;

    describe('/test post', function () {
    
        it('should be test', function (done) {


            request(app)
                .get('/sun/v1/test')
                .end(function (err, res) {

    			if (err) {
    				throw err;
    			}
    			
                res.text.should.be.exactly("Hello");
                
                done();
            
            });   
            
        });
    });
    
});