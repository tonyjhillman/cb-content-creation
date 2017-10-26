// This program serves markdown files to the cb-content-creation front-end, and
// processes those files (and their edited version) to html, at the client's
// request.

var http = require('http');
var url = require('url'); 
var qs = require('querystring');

http.createServer(function (request, response) 
{
    console.log('New connection');
    
    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;
            console.log(body);
            
            response.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"});

    		response.end(body);
        });
    }		    
}).listen(8083);

// Notify that the server is running and listening.
//
console.log('Server started');