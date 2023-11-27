const router = require("express").Router();
const {
    addBanner,
    getAllBanners,
    setActiveBanner,
} = require("../../api/Banner/banner");
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

router.post("/banners", verifyToken, verifyAdmin, addBanner);
router.get("/banners", verifyToken, verifyAdmin, getAllBanners);
router.patch("/banners/:id", verifyToken, verifyAdmin, setActiveBanner);

module.exports = router;
