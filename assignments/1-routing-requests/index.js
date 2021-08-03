const http = require("http");
const { routeHandler } = require("./routes");

const app = http.createServer(routeHandler);

app.listen(3000);