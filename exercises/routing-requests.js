const fs = require("fs");
const http = require("http");

const onRequest = (req, res) => {
    // Extracting the URL and method from the request
    const { url, method } = req;

    // Cheking if the URL is equal to "/"
    if (url === "/") {
        // Serving an input form to the user
        // Writing the head of the HTML response
        res.write("<html>");
        res.write("<head>");
        res.write("<title>Routing Requests</title>");
        res.write("<style>html {font: 400 200%/1 sans-serif;} body {height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; background-color: whitesmoke;}</style>");
        res.write("</head>");
        // Writing the body of the response
        res.write("<body><form method='POST' action='/greet'><h1>Your name</h1><input type='text' name='name' /><button>Submit</button></form></body>");
        res.write("</html>");
        // Terminating the function
        return res.end();
    }
    // Check if the request URL is equal to "/greet" and the method is "POST"
    if (url === "/greet" && method === "POST") {
        const body = [];
        // Adding an event listener to the request that will be triggered once a data input stream is initiated
        req.on("data", (data) => {
            body.push(data);
        });
        // Adding an event listener that will be triggered once the server receives the input data
        req.on("close", () => {
            // Getting a readable data response based on the received data
            const data = Buffer.concat(body).toString();
            // Extracting the name data in a useful format from the response
            const name = data.split("=")[1];
            // Writing a file that will contain the submitted name
            fs.writeFileSync(`${name}-routing-requests.txt`, `My name is ${name}`);
        });
        // Defining the status code to 302 (redirect)
        res.statusCode = 302;
        // Setting the address that the user shall be redirected to
        res.setHeader("Location", "/");
        // Terminating the function
        return res.end();
    }

};

const server = http.createServer(onRequest);

server.listen(3000);