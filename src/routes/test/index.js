const router = require("express").Router();
const {
    getAllTests,
    getTestById,
    addTest,
    getTotalNumOfTests,
    deleteTest,
} = require("../../api/Test/test");
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

router.get("/tests", getAllTests);
router.get("/tests/:id", verifyAdmin, getTestById);
router.post("/tests", verifyToken, verifyAdmin, addTest);
router.get("/tests/total", getTotalNumOfTests);
router.delete("/tests/:id", verifyToken, verifyAdmin, deleteTest);

module.exports = router;
