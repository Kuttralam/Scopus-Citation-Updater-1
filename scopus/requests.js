const request = require('request');
const apikey = '951919cec39c3b1f09885ba8575b587b'
const xml = require("xml-parse");

request('https://api.elsevier.com/content/search/scopus?query=af-id(60032114)+OR+af-id(60022265)&apiKey='+apikey, function (error, response, body) {
    if(error)
    {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    }
    else if(!error  && response.statusCode==200)
    {
        var jsonObj = xml.parse(body);
        var jsonStr = xml.stringify(jsonObj, 2);
        console.log(jsonStr); // Print the HTML for the Google homepage.
    }
});

