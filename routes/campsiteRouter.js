const express = require("express");

const campsiteRouter = express.Router();
campsiteRouter.use(express.json());

// curl -X POST -v -H "Content-Type: application/json" -d "{"name":"value1", "description":"value2"}" http://localhost:3000/campsites/

campsiteRouter.route("/").all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
})

.get((req, res) => {
    res.end("Will send all the campsites to you");
})

.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})

.put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /campsites");
})

.delete((req, res) => {
    res.end("Deleting all campsites");
});

module.exports = campsiteRouter;
