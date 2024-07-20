const jsonServer = require("json-server");
const fs = require("fs");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.rewriter({
    '/items/:id/done': '/items/:id?done'
}))

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use(async (req, res, next) => {
    if (req.method === "POST") {
        req.body.createdAt = Date.now();
    }

    const idMatch = req.url.match(/(?<id>\d+)/);

    if (req.method === "PUT" && typeof req.query.done !== 'undefined' && idMatch && idMatch.groups.id) {
        // TODO: handle error
        const db = JSON.parse(fs.readFileSync("./db.json",{ encoding: 'utf8' }))
        console.log(req.body);
        const item = db.items.find(item => item.id === parseInt(idMatch.groups.id));

        req.body.createdAt = item.createdAt;
        req.body.finishedAt = Date.now();
        req.body.label = item.label;
    }

    next();
});

// Use default router
server.use(router);
server.listen(3000, () => {
    console.log("JSON Server is running");
});
