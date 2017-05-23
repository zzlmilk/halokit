var should = require('should');
var request = require('supertest');
var app = require('../mainTest');


describe('WEB', function () {

    var req, res;

    describe('/test post', function () {
    
        it('should be test', function (done) {

            var params = {
                    name :"rex"
            }

            request(app)
                .post('/sun/v1/test')
                .send(params)
                .end(function (err, res) {

    			if (err) {
    				throw err;
    			}
    			
                res.text.should.be.exactly("test");
                
                done();
            
            });   
            
        });
    });
    
});