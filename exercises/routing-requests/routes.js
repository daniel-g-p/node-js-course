const fs = require("fs");

const onRequest = (req, res) => {
    const { url, method } = req;
    if (url === "/") {
        res.write("<html>");
        res.write("<head>");
        res.write("<title>Routing Requests</title>");
        res.write("<style>html {font: 400 200%/1 sans-serif;} body {height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; background-color: whitesmoke;}</style>");
        res.write("</head>");
        res.write("<body><form method='POST' action='/greet'><h1>Your name</h1><input type='text' name='name' /><button>Submit</button></form></body>");
        res.write("</html>");
        return res.end();
    }
    if (url === "/greet" && method === "POST") {

        const body = [];
        req.on("data", (data) => {
            body.push(data);
        });
        return req.on("close", () => {
            const data = Buffer.concat(body).toString();
            const name = data.split("=")[1];
            fs.writeFile(`${name.toLowerCase()}-routing-requests.txt`, `My name is ${name}`, err => {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        });
    }
};

module.exports.onRequest = onRequest;