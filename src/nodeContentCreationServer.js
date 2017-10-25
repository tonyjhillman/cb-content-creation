// This program serves markdown files to the cb-content-creation front-end, and
// processes those files (and their edited version) to html, at the client's
// request.

var http = require('http');
var url = require('url'); 

http.createServer(function (request, response) 
{
    console.log('New connection');
    
    var queryObject = url.parse(request.url, true).query
    var fileContentString = queryObject.MyFileContent;
    console.log("Markdown-file content is " + fileContentString);
    
    response.writeHead(200, {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"});
    //response.end(JSON.stringify(hits));
    response.end(fileContentString);
    		    
}).listen(8083);

// Notify that the server is running and listening.
//
console.log('Server started');