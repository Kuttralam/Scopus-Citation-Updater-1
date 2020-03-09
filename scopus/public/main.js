console.log("loaded");

var divs = document.getElementById("content");



window.onload = function(){
    var divs = document.getElementById("content");
    var li1 = document.getElementById("li1 a");
    var li2 = document.querySelector("#li2 a");
    var li3 = document.querySelector("#li3 a");
    var li4 = document.querySelector("#li4 a");
    
    document.getElementById("li1").onclick=function(){
        divs.innerHTML = "<h2 id='CitationTest'> Cited by count </h2><h4>Retrieving Scopus Cited-By counts using scopus id of the document </h4><form action = '/search/citation' method = 'GET' ><input type ='text' id='scopusId' placeholder = 'Scopus id ' name='scopusid'><input id='searchSubmit' type = 'submit'></form>";
        document.title = "Citation Page";
        li3.classList.remove("active");
        li4.classList.remove("active");
        li2.classList.remove("active");    
    }
    
    document.getElementById("li2").onclick=function(){
        divs.innerHTML =  "<h2 id='ScopusTest'>Scopus Search </h2><h4>This search can retrieve anything based on a keyword</h4><form action = '/search/scopus' method = 'GET' ><input type ='text' id='keyWord' placeholder = 'Keyword' name='keyword'><input id = 'searchSubmit' type = 'submit'></form>";
        document.title = "Scopus Page";
        li3.classList.remove("active");
        li4.classList.remove("active");
        li2.classList.add("active");    
    }
    document.getElementById("li3").onclick=function(){
        
        li3.classList.add("active");
        li4.classList.remove("active");
        li2.classList.remove("active");    
    }
    document.getElementById("li4").onclick=function(){
        divs.innerHTML = "<h2 id='SerialTest'> Serial Title or ISSN search </h2><h4>This search can retrieve citation based on doi</h4><form action = '/search/serial' method = 'GET' ><input type ='text' id ='serialTitle' placeholder = 'Serial Title ' name='title'><input type ='text' id='issn' placeholder = 'ISSN' name='issn'><input id='searchSubmit' type = 'submit'></form>";
        document.title = "Serial Title Page";
        li3.classList.remove("active");
        li4.classList.add("active");
        li2.classList.remove("active");    
    }    
    
}
