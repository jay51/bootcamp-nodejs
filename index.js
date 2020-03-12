const http      = require("http");
const path      = require("path");
const fs        = require("fs");

const HOSTNAME = "localhost";
const PORT = 3000;


const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if(req.method == "GET"){

        let fileUrl = req.url == "/" ? "/index.html" : req.url;

        const filePath = path.resolve("./public" + fileUrl);
        const fileExt = path.extname(filePath);
        console.log(filePath);

        if(fileExt == ".html"){
            fs.access(filePath, err => {

                // if html file doesn't exist
                if (err) {
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "text/html");
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return;
                }

                res.statusCode = 202;
                res.setHeader("Content-Type", "text/html");
                fs.createReadStream(filePath).pipe(res);
            });

        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html");
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }

    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
    }

});


server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});


