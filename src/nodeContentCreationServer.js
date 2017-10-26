// This program serves markdown files to the cb-content-creation front-end, and
// processes those files (and their edited version) to html, at the client's
// request.

var http = require('http');
var url = require('url'); 
var fs = require('fs');

http.createServer(function (request, response) 
{
    console.log('New connection');
    
    var queryObject = url.parse(request.url, true).query
    
    
    if (request.method == 'POST') 
    {
        var body = '';
        var writeLocation = queryObject.LocationForWrite;
    	console.log("Location for write... is " + writeLocation);

        request.on('data', function (data) 
        {
            body += data;
            console.log(body);
            
            fs.writeFile(writeLocation, body, function(err) 
            {
   				if (err) 
   				{
        			return console.log(err);
    			}
    			
    			console.log("The file was saved!");
			}); 
            
            response.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"});

    		response.end(body);
        });
    }		    
    else
    {
    	if (request.method == 'GET')
    	{
    		var dataToReturn = '';
    		var readLocation = queryObject.LocationForRead;
    		console.log("Location for read is " + readLocation);
    		
				fs.readFile(readLocation, 'utf8', function(err, data)
				{
					if (err) 
					{
						return console.log(err);
					}
					
					dataToReturn = data;
					
					console.log("The file was found!");
					
				response.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"});

    			response.end(dataToReturn);
				});
		}
    }
}).listen(8083);

// Notify that the server is running and listening.
//
console.log('Server started');