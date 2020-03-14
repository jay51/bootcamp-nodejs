const express = require("express");
const morgan = require("morgan");

const campsiteRouter = require("./routes/campsiteRouter");


const HOSTNAME = "localhost";
const PORT = 3000;

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use("/campsites", campsiteRouter);

app.get("/campsites/:campsiteId", (req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
});

app.post("/campsites/:campsiteId", (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

// curl -X PUT -v -H "Content-Type: application/json" -d "{"name":"value1", "description":"value2"}" http://localhost:3000/campsites/23
app.put("/campsites/:campsiteId", (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
    with description: ${req.body.description}`);
});

app.delete("/campsites/:campsiteId", (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});




app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
