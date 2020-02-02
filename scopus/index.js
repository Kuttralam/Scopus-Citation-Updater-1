var express = require("express");
var app  = express();
const request = require('request');
const apikey = '951919cec39c3b1f09885ba8575b587b'
const xml = require("xml-parse");
var OrcidStrategy = require('passport-orcid').Strategy;
app.use(express.static("public"));
app.set("view engine","ejs");

console.log("welcome to home");



app.get("/index",function(req,res)
{
   console.log("Server started"); 
   res.render("index");
});

app.get("/excel",function(req,res)
{
    console.log("Excel Sheet");
    res.render("excel")
})
app.get("/addNew",function(req,res)
{
    console.log("Excel Sheet");
    res.render("NewFaculty")
})

app.get("/login",function(req,res)
{
    console.log("Login page");
   res.render("login") 
});

app.get("/",function(req,res)
{
    console.log("welcome page");
   res.render("welcome") 
});
app.get("/search/citation",function(req,res)
{
    console.log("citation")
    var scopusid = req.query.scopusid 
    var url = "https://api.elsevier.com/content/search/scopus?query=SCOPUS-ID("+scopusid+")&field=citedby-count&apiKey=951919cec39c3b1f09885ba8575b587b";
    request(url, function (error, response, body) {
    if(error)
    {
        console.error('error in Citations :', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send("error")
    }
    else if(!error)
    {
        var jsonObj = xml.parse(body);
        var jsonStr = xml.stringify(jsonObj,5);
        
        res.render("citation",{data:jsonObj});
    }
   
    });
});

app.get("/search/scopus",function(req,res)
{
    console.log("scopus")
    var keyword = req.query.keyword 
    var url = "https://api.elsevier.com/content/search/scopus?query=all("+keyword+")&apiKey="+apikey;
    request(url, function (error, response, body) {
    if(error)
    {
        console.error('error in Authors :', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send("error")
    }
    else if(!error)
    {
        var jsonObj = xml.parse(body);
        var jsonStr = xml.stringify(jsonObj,5);
        
        res.render("scopus",{data:jsonObj});
    }
   
    });
});

app.get("/search/abstractcitation",function(req,res)
{
    console.log("Abstract Citation Count ")
    var doi = req.query.doi 
    //10.1016%2FS0014-5793(01)03313-0
    var url = "https://api.elsevier.com/content/abstract/citation-count?doi=10.1016%2FS0014-5793(01)03313-0&apiKey=951919cec39c3b1f09885ba8575b587b";
    request(url, function (error, response, body) {
    if(error)
    {
        console.error('error in Authors :', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send("error")
    }
    else if(!error)
    {
        var jsonObj = xml.parse(body);
        var jsonStr = xml.stringify(jsonObj,5);
        console.log(body)
        console.log(jsonObj);
        res.render("abstractcitation",{data:jsonObj});
    }
   
    });
});

/**
app.get("/search/affiliation",function(req,res)
{
   console.log("Search page"); 
   var affiliation1 = req.query.affiliation;
   var affiliation2 = "60022265";
   //+OR+af-id('+affiliation2+')
   var url = 'https://api.elsevier.com/content/search/scopus?query=af-id('+affiliation1+')&apiKey='+apikey;
   
   request(url, function (error, response, body) {
    if(error)
    {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    }
    else if(!error  && response.statusCode==200)
    {
        var jsonObj = xml.parse(body);
        var jsonStr = xml.stringify(jsonObj,5);
        
        res.render("affiliation",{affiliation1:affiliation1,affiliation2:affiliation2,ThingVar:jsonObj});
    }
   
    });
   
});
 */

app.get("/search/serial",function(req,res)
{
   console.log("Serial Title page"); 
   var title = req.query.title;
   var issn = req.query.issn;
   var url = 'https://api.elsevier.com/content/serial/title?issn=03781119&apiKey=951919cec39c3b1f09885ba8575b587b';
   
   request(url, function (error, response, body) {
    if(error)
    {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    }
    else if(!error  && response.statusCode==200)
    {
        var jsonObj = xml.parse(body);
        var jsonStr = xml.stringify(jsonObj,5);
        
       res.render("serial",{data:jsonObj});
    }
   
    });
   
});

app.listen(8000,"localhost",function()
{
    console.log("server started");
})