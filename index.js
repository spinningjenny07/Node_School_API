/* jslint esversion:6 */

var http = require("http");
var fs = require("fs");

var classes = { 
		english : {
			grade: "B",
			homework: false
		},
		programming : {
			grade: "A+",
			homework: true
		},
		biology: {
			grade: "C-",
			homework: true
		}, 
		art: {
			grade: "A++",
			homework: false
		}
	};	


var server = http.createServer((req, res) => {
    if (req.url === "/index.html" || req.url === "/"){
        fs.readFile("index.html", (err, data) => {
            res.write(data);
            res.end();
        });
    } else if(req.url === "/grades") {
        if (req.method === "GET") {
            res.write(JSON.stringify(classes));
            res.end();
        }
        
    } else if(req.url === "/schedule") {
        if (req.method === "GET") {
            res.write(JSON.stringify(classes));
            res.end();
        } else if (req.method === "POST") {
    		var queryData = "";

            req.on('data', function(data) {
            	//every time data comes in, append that data to the existing data
                queryData += data;
                //if the user sent more than a million bytes of data stop
                if(queryData.length > 1e6) {
                    queryData = "";
                    //kill the connection and send back a 413 error
                    res.writeHead(413, {'Content-Type': 'text/plain'}).end();
                    req.connection.destroy();
                }
            });

            req.on('end', function() {

            	classes[queryData] =
               		{
						grade: "B",
						homework: false
					};
			});
			res.end();
		}

	} else if(req.url === "/homework/") {
    	if (req.method === "GET") {
    		res.write(JSON.stringify(classes));
    		res.end();
    	}
    } else if(req.url.substr (0, 10) === "/homework/") {
    	if (req.method === "GET") {
    		var cls = req.url.split("/");
    		cls = cls[cls.length -1];
    		// console.log(classes[cls].homework);

    		res.write(JSON.stringify(classes[cls].homework));
    		res.end();
    	} else if (req.method === "POST") {
    		var queryData = "";

            req.on('data', function(data) {
            	//every time data comes in, append that data to the existing data
                queryData += data;
                //if the user sent more than a million bytes of data stop
                if(queryData.length > 1e6) {
                    queryData = "";
                    //kill the connection and send back a 413 error
                    res.writeHead(413, {'Content-Type': 'text/plain'}).end();
                    req.connection.destroy();
                }
            });

            req.on('end', function() {

            	classes[queryData] =
               		{
						homework: false
					};
			});
			console.log(queryData);
			res.end();
		}


    } else {
        res.write("This is Jenny's Server!");
        res.end();
    }


// entire server function 
});


server.listen(8000, () => {
    console.log("Server started on port 8000");
});

