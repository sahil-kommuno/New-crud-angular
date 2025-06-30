const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const Port = process.env['Port']  

app.use(cors()); 
app.use(express.json()); 

require("./MongoDB.connection/MongoDB.connection");


const routes = require("./Routes/User.formdata.route");
app.use(routes);
const searchroutes = require("./Routes/Search.formdata.Route")
app.use(searchroutes)
app.use("/uploads", express.static("uploads"));

app.listen(Port, () => {
  console.log(`Server is running on Port: ${Port}`);
});


