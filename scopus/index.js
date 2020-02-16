var express = require("express");
var app  = express();
const request = require('request');
const apikey = '951919cec39c3b1f09885ba8575b587b'
const xml = require("xml-parse");
var OrcidStrategy = require('passport-orcid').Strategy;
var mongoose = require("mongoose");


var ScopusSchema = new mongoose.Schema({
    name : String,
    scopusId : String,
    authorId:String,
    citationCount : Number,
    moreInfo : String
});

var Scopus = mongoose.model("Scopusdb",ScopusSchema);

var currFaculty = new Scopus({
    name:"Sabharish",
    scopusId:"2323233",
    authorId:"1212121",
    citationCount:123,
    moreInfo:"Not Available"
});

app.use(express.static("public"));
app.set("view engine","ejs");

console.log("welcome to home");

app.get("/authenticate",function(req,res)
{
    var name = req.query.orcid;
    var pass = req.query.password;
    if (name.length==0 || pass.length==0)
    {
       console.log("Empty username or password");
       res.redirect("/login");
       
    }
    else
    {
        res.redirect("/index");
    }
});
app.get("/index",function(req,res)
{
   res.render("index");
});

app.get("/excel",function(req,res)
{
    Scopus.find({},function(err,AllScopus)
    {
        if(err)
        {
            console.log("findingla thappu");
        }
        else{
            console.log("Excel Sheet");
            res.render("excel",{Scopus:AllScopus});
        }
    })
})

app.get("/addNew",function(req,res)
{
    console.log("Excel Sheet");
    res.render("NewFaculty")
})

app.get("/adding",function(req,res)
{
    Scopus.create( new Scopus({
        name:req.query.name,
        scopusId:req.query.scopusId,
        authorId:req.query.authorId,
        citationCount:0,
        moreInfo:"Not Available"
    }))
    console.log("Adding Scopus of faculty");
    res.redirect("/excel");
});

app.get("/removing",function(req,res)
{
    var x = req.query.name;
    console.log(x);
    console.log("removing Scopus of faculty");
    Scopus.deleteOne({name:x},function(err)
    {
        if(err) {console.log("deletingla thappu");}
        else{
            console.log("delete paniten");
        }
    })
    res.redirect("/excel");
});

app.get("/login",function(req,res)
{
    console.log("Login page");
    res.render("login");
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
    console.log(scopusid)
    if (scopusid=="")
    {
       console.log("Empty scopus Id");
       res.redirect("/index");
       console.log("dedede");
       
    }
    else
    {
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
            res.render("citation",{data:jsonObj});
        }
    });
    }
});

app.get("/search/scopus",function(req,res)
{
    console.log("scopus")
    var keyword = req.query.keyword 
   if (keyword=="")
   {
       console.log("Empty keyword");
       res.redirect("/index");
       
   }
   else
   {
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
        
        res.render("scopus",{data:jsonObj});
    }
   
    });
    }
});

app.get("/details",function(req,res)
{
    var name = req.query.name;
    console.log(name);

    Scopus.find({name:name},{'_id':0,'authorId':1},function(err,result)
    {
        if(err){}
        else{
            var searchResult = result[0]["authorId"];
            console.log(searchResult);

            var options={
            url :"https://api.elsevier.com/content/author/author_id/22988279600?apiKey=7f59af901d2d86f78a1fd60c1bf9426a",
            headers:{'Accept': 'application/json'}
            };
            request(options, function (error, response, body) {
            if(error)
            {
                console.error('error in Authors :', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                res.send("error")
            }
            else if(!error)
            {
                //var jsonObj = xml.parse(body);
                //console.log(body);
                var jsonObj = JSON.parse(body);
                var reqData = jsonObj['author-retrieval-response'][0];
                res.render("details",{data:reqData});
            }
           
            });

        }
    })
});


app.get("/search/serial",function(req,res)
{
   console.log("Serial Title page"); 
   var title = req.query.title;
   var issn = req.query.issn;
   var url = 'https://api.elsevier.com/content/serial/title?issn=03781119&apiKey=951919cec39c3b1f09885ba8575b587b';

   if (issn=="")
   {
       console.log("Empty issn");
       res.redirect("/index");
       
   }
   else
   {
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
   }
   
});

app.listen(8000,"localhost",function()
{
    console.log("server started");
    mongoose.connect("mongodb://127.0.0.1:27017/Scopus",{useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
});
})