const cors = require("cors");


const whitelist = ["http://localhost:3000", "https://localhost:3443"];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    console.log("HEADER: ", req.header("Origin"));

    if(whitelist.indexOf(req.header("Origin")) !== -1){
        corsOptions = {origin: true }
    } else{
        corsOptions = {origin: false }
    }

    callback(null, corsOptions);

}


module.exports.cors = cors();
module.exports.corsWithOptions = cors(corsOptionsDelegate);

