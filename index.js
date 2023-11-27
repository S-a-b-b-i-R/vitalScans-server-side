const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./src/db/connectDB");
const authRoutes = require("./src/routes/authentication");
const userRoutes = require("./src/routes/user");
const testRoutes = require("./src/routes/test");
const slotRoutes = require("./src/routes/slot");
const bannerRoutes = require("./src/routes/banner");

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(userRoutes);
app.use(testRoutes);
app.use(slotRoutes);
app.use(bannerRoutes);

//routes
app.get("/", (req, res) => {
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
