var expect  = require('chai').expect;
var should  = require('chai').should;
var request = require('request');


describe('1) MAIN PAGE', function(done){
    it('content', function(done) {
        request('http://localhost:8000' , function(error, response, body) {
            expect(response.statusCode).to.equal(200);   
            done();
        });
    });
    });

describe('2) LOGIN PAGE', function(done){
    it('content', function(done) {
        request('http://localhost:8000/login' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);   
        done();
        });
    });
    it('Should be success if credential is non empty', function(done) {
        let orcid='sathiyajith';
        let password='asasasas';
        request.get('http://localhost:8000/authenticate?orcid='+orcid+'&&password='+password,function(error,response,body)
        {
            expect('Location','/index');
            done();
        });
    });
    it('Should be failure if credential is empty', function(done) {
        let orcid='';
        let password='asasasas';
        //
        request.get('http://localhost:8000/authenticate?orcid='+orcid+'&password='+password,function(error,response,body)
        {
            expect('Location','/index');
            done();
        });
    });
    it('Should be failure if credential is aplhabets or more than the 16 digits', function(done) {
        let orcid='124564532135456633123';
        let password='asasasas';
        //
        request.get('http://localhost:8000/authenticate?orcid='+orcid+'&password='+password,function(error,response,body)
        {
            should(response.statusCode).not.to.equal(200);   
            done();
        });
    });
});

describe('3) SEARCH PAGE', function(done){
    it('content', function(done) {
        request('http://localhost:8000/index' , function(error, response, body) {
            expect(response.statusCode).to.equal(200);   
            done();
        });
    });
    it('Should be failure if scopus id has alphabets or empty or more than 16 digits with hyphens', function(done) {
        let scopusId='';
        request.get('http://localhost:8000/search/citation?scopus='+scopusId,function(error,response,body)
        {
            expect(response.statusCode).not.to.equal(200);   
            done();
        });
    });
});


    //http://localhost:8000/search/citation?scopusid=82755170946
    //http://localhost:8000/search/scopus?keyword=gene
    //http://localhost:8000/search/serial?title=&issn=asas
    //http://localhost:8000/excel
    //http://localhost:8000/details?name=sathiyajith+K+S
    //http://localhost:8000/adding?name=sathiyajith&scopusId='12012'&authorId='145125'

describe('4) EXCEL PAGE', function(done){
    it('database should not be inputted with invalid scopus id and author id', function(done) {
        let scopusId='1231155663212223'
        let name = 'asasasasa'
        let authorId='15sasasasasasa'
        request('http://localhost:8000/adding?name='+name+'&scopusId='+scopusId+'&authorId='+authorId , function(error, response, body)
         {
            expect(response.statusCode).not.to.equal(200);   
            done();
         });
        });
    });
    