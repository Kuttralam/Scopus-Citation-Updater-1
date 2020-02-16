
const request = require('supertest');
const app = require('../index.js');
const expect = require('chai').expect;
/** 
describe('Login API', function() {
    it('Should success if credential is valid', function(done) {
        request(app)
           .get('/login')
           .set('Content-Type', 'text/html')
           .send({orcid:'username'})
           .expect(200)
           .expect(function(response) {
              expect(response.body).not.to.be.empty;
           })
           .end(done);
    }); 
});
*/