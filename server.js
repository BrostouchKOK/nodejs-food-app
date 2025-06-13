const express = require("express");

// rest object
const app = express();

//rout
// URL => http://localhost:8080
app.get("/",(req,res)=>{
    return res.status(200).send("<h1>Hello food server app</h2>")
})

// PORT
const PORT = 8080;

// listen
app.listen(PORT,()=>{
    console.log("Server Running");
})