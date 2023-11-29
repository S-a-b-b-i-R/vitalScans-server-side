require("dotenv").config();
const {
    makePayment,
    getPaymentByUserId,
    getAllPayments,
    getPaymnetById,
    getPaymentSuccessByUserId,
    cancelPaymentById,
    salesStats,
} = require("../../api/Payment/payment");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../../model/User");

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

const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.email;
    const query = { email: email };
    const user = await User.findOne(query);
    const isAdmin = user?.role === "admin";
    if (!isAdmin) {
        return res.status(403).send("Forbidden Access");
    }
    next();
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
router.get("/payments", verifyToken, verifyAdmin, getAllPayments);
router.get("/payment/:id", verifyToken, getPaymnetById);
router.get("/paymentsuccess/:email", verifyToken, getPaymentSuccessByUserId);
router.patch("/payments/:id", verifyToken, cancelPaymentById);
router.get("/salesstats", salesStats);

module.exports = router;
