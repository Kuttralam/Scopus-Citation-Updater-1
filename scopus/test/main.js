console.log("loaded");

var divs = document.getElementById("content");
var li1 = document.getElementById("li1");
var li2 = document.querySelector("#li2");



window.onload = function(){
    var divs = document.getElementById("content");
    
    document.getElementById("li1").onclick=function(){
        divs.innerHTML = "<h2 id='#citations'> Cited by count </h2><h4>Retrieving Scopus Cited-By counts using scopus id of the document </h4><form action = '/search/citation' method = 'GET' ><input type ='text' placeholder = 'Scopus id ' name='scopusid'><input type = 'submit'></form>";
    }
    
    document.getElementById("li2").onclick=function(){
        divs.innerHTML =  "<h2>Scopus Search </h2><h4>This search can retrieve anything based on a keyword</h4><form action = '/search/scopus' method = 'GET' ><input type ='text' placeholder = 'Keyword' name='keyword'><input type = 'submit'></form>";
    }

    document.getElementById("li3").onclick=function(){
        divs.innerHTML = "<h2> Abstract Citation count </h2><h4>This search can retrieve citation based on doi</h4><form action = '/search/abstractcitation' method = 'GET' ><input type ='text' placeholder = 'doi ' name='doi'><input type = 'submit'></form>";
    }
    document.getElementById("li4").onclick=function(){
        divs.innerHTML = "<h2> Serial Title or ISSN search </h2><h4>This search can retrieve citation based on doi</h4><form action = '/search/serial' method = 'GET' ><input type ='text' placeholder = 'Serial Title ' name='title'><input type ='text' placeholder = 'ISSN' name='issn'><input type = 'submit'></form>";
    }    
    
}
