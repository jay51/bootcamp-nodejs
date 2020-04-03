const express = require("express");
const authenticate= require("../authenticate");
const cors = require("./cors");

const promotionRouter = express.Router();
promotionRouter.use(express.json());

promotionRouter.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))

promotionRouter.route("/").all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
})

.get(cors.cors, (req, res) => {
    res.end("Will send all the campsites to you");
})

.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})

.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /campsites");
})

.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.end("Deleting all campsites");
});


promotionRouter.route("/:promotionId").all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
})

.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))

.get(cors.cors, (req, res) => {
    res.end(`Will send details of the promotion : ${req.params.promotionId} to you`);
})

.post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})

.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
    with description: ${req.body.description}`);
})

.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.end("Deleting all campsites");
});


module.exports = promotionRouter;
