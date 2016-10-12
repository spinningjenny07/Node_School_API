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
	//it's in quotes b/c it doesn't recognize it as a string since it's 2 words
	"abstract algebra": {

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
        }
    } else if(req.url === "/schedule") {
    	if (req.method === "POST") {
    		var queryData = "";

            req.on('data', function(data) {
                queryData += data;
                //if the user send more than a million bytes of data stop
                if(queryData.length > 1e6) {
                    queryData = "";
                    //kill the connection and send back a 413 error
                    res.writeHead(413, {'Content-Type': 'text/plain'}).end();
                    req.connection.destroy();
                }
            });

            req.on('end', function() {
                classes.push(queryData);
            });
        }
    } else if(req.url === "/homework/") {
    	if (req.method === "GET") {
    		res.write(JSON.stringify(classes));
    		res.end();
    	}
    } else if(req.url === "/homework/:class_name") {
    	if (req.method === "GET") {
    		res.write(JSON.stringify(classes));
    		res.end();
    	}
    } else {
        res.write("This is Jenny's Server!");
        res.end();
    }
});


server.listen(8000, () => {
    console.log("Server started on port 8000");
});
