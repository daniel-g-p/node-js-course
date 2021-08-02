// Requiring the HTTP module to create servers
const http = require("http");

// Requiring the process module to manage and contain the Node processes
const process = require("process");

// Creating a function that will be called on every request to the server
const requestListener = (req, res) => {
    // Logging the request argument
    console.log("Request Object:", req);
    // Logging the request headers
    console.log("Request headers:", req.headers);
    // Logging the request URL
    console.log("Request headers:", req.url);
    // Logging the request URL
    console.log("Request method:", req.method);
    // Logging the current Node processes' ID
    console.log("Process ID:", process.pid);
    // Setting the response content type as a header on the response
    res.setHeader("Content-Type", "text/html");
    // Specifying the actual content of the response in HTML
    res.write("<html><head><style>h1{font-family: sans-serif;}</style></head><body><h1>Hello World</h1></body></html>");
        // Indicating the end of the response content
    res.end();
    // Terminating the process and ultimately the application once the request is received on the server
    // process.exit();
}

// Creating a server and pointing to the function to be called on request
const server = http.createServer(requestListener);

// Starting the server on the specified port
server.listen(8080);