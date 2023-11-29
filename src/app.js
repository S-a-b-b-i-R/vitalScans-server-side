const express = require("express");
const applyMiddlewares = require("./middlewares");
const globalErrorHandler = require("./utils/globalErrorHandler");
const connectDB = require("./db/connectDB");
require("dotenv").config();

const app = express();

// const port = process.env.PORT || 5000;

const authRoutes = require("./routes/authentication");
const userRoutes = require("./routes/user");
const testRoutes = require("./routes/test");
const slotRoutes = require("./routes/slot");
const bannerRoutes = require("./routes/banner");
const bookingRoutes = require("./routes/booking");
const paymentRoutes = require("./routes/payment");
const reportRoutes = require("./routes/report");
const promoRoutes = require("./routes/promo");
const serviceRoutes = require("./routes/service");

applyMiddlewares(app);

app.use(authRoutes);
app.use(userRoutes);
app.use(testRoutes);
app.use(slotRoutes);
app.use(bannerRoutes);
app.use(bookingRoutes);
app.use(paymentRoutes);
app.use(reportRoutes);
app.use(promoRoutes);
app.use(serviceRoutes);

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

app.use(globalErrorHandler);

// global error handler

// const main = async () => {
//     await connectDB();
//     app.listen(port, () => {
//         console.log(`Diangnostic Server is running on port ${port}`);
//     });
// };

// main();
module.exports = app;
