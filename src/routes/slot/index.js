const router = require("express").Router();
const {
    addUpdateSlot,
    getAllSlots,
    getSlotById,
    getSlotsByDateRange,
} = require("../../api/Slot/slot");
const jwt = require("jsonwebtoken");
const User = require("../../Model/User");

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

router.post("/slots", verifyToken, verifyAdmin, addUpdateSlot);
router.get("/slots", verifyToken, verifyAdmin, getAllSlots);
router.get("/slots/:id", verifyToken, getSlotById);
router.get("/slots/:startDate/:endDate", getSlotsByDateRange);

module.exports = router;
