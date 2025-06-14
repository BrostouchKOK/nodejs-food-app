const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const router = require("./routes/testRout");
const connectDB = require("./config/db");

// dot env configuration
dotenv.config();

// DB connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//rout
// URL => http://localhost:8080
app.use("/api/v1/test",require("./routes/testRout"))
app.use("/api/v1/auth",require("./routes/authRoutes"))
app.use("/api/v1/user",require("./routes/userRoutes"));


app.get("/",(req,res)=>{
    return res.status(200).send("<h1>Hello food server app</h2>")
})

// PORT
const PORT = process.env.PORT || 5000

// listen
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`.white.bgMagenta)
})