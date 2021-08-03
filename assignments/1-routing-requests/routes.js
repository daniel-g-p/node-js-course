class User {
    constructor(username) {
        this.username = username;
    }
    createID() {
        let id = "";
        for (let i = 0; i < 10; i++) {
            id += Math.floor(Math.random() * 10);
        };
        this.id = id;
    }
}

const users = [];

const registerUser = (username) => {
    const user = new User(username);
    user.createID();
    users.unshift(user);
}

for (let i = 1; i <= 10; i++) {
    registerUser(`user${i}`);
}

const routeHandler = (req, res) => {
    const { url, method } = req;
    if (url === "/") {
        res.write("<html>");
        res.write("<head>");
        res.write("<title>App - Register</title>");
        res.write("</head>");
        res.write("<body>");
        res.write("<h1>Register</h1>");
        res.write("<a href='/users'>All Users</a>");
        res.write("<form method='POST' action='/register'>");
        res.write("<input type='text' name='username'>");
        res.write("<button>Register</button>");
        res.write("</form>");
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }
    if (url === "/register") {
        const body = [];
        req.on("data", data => {
            body.push(data);
        });
        return req.on("close", () => {
            const data = Buffer.concat(body).toString();
            const username = data.split("=")[1];
            registerUser(username);
            res.statusCode = 302;
            res.setHeader("Location", "/users");
            return res.end();
        });
    }
    if (url === "/users") {
        res.write("<html>");
        res.write("<head>");
        res.write("<title>App - Users</title>");
        res.write("</head>");
        res.write("<body>");
        res.write("<h1>Users</h1>");
        res.write("<a href='/'>New User</a>");
        res.write("<ul>");
        for (let user of users) {
            res.write("<li>");
            res.write(`${user.username} - ${user.id}`);
            res.write("</li>");
        }
        res.write("</ul>");
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }
};

module.exports.routeHandler = routeHandler;