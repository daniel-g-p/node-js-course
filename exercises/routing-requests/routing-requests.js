const http = require("http");
const { onRequest } = require("./routes");

const server = http.createServer(onRequest);

server.listen(3000);

// const onRequest = (req, res) => {
//     // Extracting the URL and method from the request
//     const { url, method } = req;

//     // Cheking if the URL is equal to "/"
//     if (url === "/") {
//         // Writing the head of the HTML response
//         res.write("<html>");
//         res.write("<head>");
//         res.write("<title>Routing Requests</title>");
//         res.write("<style>html {font: 400 200%/1 sans-serif;} body {height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; background-color: whitesmoke;}</style>");
//         res.write("</head>");
//         // Serving an input form to the user
//         res.write("<body><form method='POST' action='/greet'><h1>Your name</h1><input type='text' name='name' /><button>Submit</button></form></body>");
//         res.write("</html>");
//         // Terminating the function
//         return res.end();
//     }
//     if (url === "/greet" && method === "POST") { // Check if the request URL is equal to "/greet" and the method is "POST"

//         const body = [];
//         req.on("data", (data) => { // Adding an event listener to the request that will be triggered once a data input stream is initiated
//             body.push(data);
//         });
//         return req.on("close", () => { // Adding an event listener that will be triggered once the server receives the input data
//             const data = Buffer.concat(body).toString(); // Getting a readable data response based on the received data
//             const name = data.split("=")[1]; // Extracting the name data in a useful format from the response
//             // Writing the fila asynchronously to avoid code blocking
//             fs.writeFile(`${name.toLowerCase()}-routing-requests.txt`, `My name is ${name}`, err => {
//                 // Implementing the HTTP response only as soon as the file writing process is complete
//                 res.statusCode = 302; // Defining the status code to 302 (redirect)
//                 res.setHeader("Location", "/"); // Setting the address that the user shall be redirected to
//                 return res.end(); // Terminating the function

//             });

//         });
//     }
// };