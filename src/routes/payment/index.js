require("dotenv").config();
const {
    makePayment,
    getPaymentByUserId,
} = require("../../api/Payment/payment");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

router.post("/create-payment-intent", async (req, res) => {
    const { price } = req.body;
    const amount = parseInt(price * 100) || 50; //
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
    });
    res.send({
        clientSecret: paymentIntent.client_secret || "null",
    });
});
router.get("/payments/:email", verifyToken, getPaymentByUserId);
router.post("/payments", verifyToken, makePayment);

module.exports = router;
