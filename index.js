const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./src/db/connectDB");

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.get("/health", (req, res) => {
    res.send("Diagnostic server is running....");
});

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on the server`);
    error.status = 404;
    next(error);
});

// global error handler

const main = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Diangnostic Server is running on port ${port}`);
    });
};

main();
