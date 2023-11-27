const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../../Model/User");
const { addBooking, getBookingsByEmail } = require("../../api/Booking/booking");

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Unathorized Access");
    }
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send("Unathorized Access");
        }
        req.decoded = decoded;
        next();
    });
};

router.post("/bookings", verifyToken, addBooking);
router.get("/bookings/:email", verifyToken, getBookingsByEmail);

module.exports = router;
