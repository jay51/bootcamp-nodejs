const express = require("express");
const morgan = require("morgan");

const campsiteRouter    = require("./routes/campsiteRouter");
const promotionRouter   = require("./routes/promotionRouter");
const partnerRouter     = require("./routes/partnerRouter");


const HOSTNAME = "localhost";
const PORT = 3000;

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use("/campsites", campsiteRouter);
app.use("/promotions", promotionRouter);
app.use("/partners", partnerRouter);


// For any other route (error)
app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});
app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
