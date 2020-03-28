const express = require("express");
const authenticate= require("../authenticate");

const promotionRouter = express.Router();
promotionRouter.use(express.json());

// curl -X POST -v -H "Content-Type: application/json" -d "{"name":"value1", "description":"value2"}" http://localhost:3000/campsites/

promotionRouter.route("/").all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
})

.get((req, res) => {
    res.end("Will send all the campsites to you");
})

.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})

.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /campsites");
})

.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.end("Deleting all campsites");
});


promotionRouter.route("/:promotionId").all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
})

.get((req, res) => {
    res.end(`Will send details of the promotion : ${req.params.promotionId} to you`);
})

.post(authenticate.verifyUser, (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})

.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
    with description: ${req.body.description}`);
})

.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.end("Deleting all campsites");
});


module.exports = promotionRouter;
