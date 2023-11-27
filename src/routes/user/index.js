const {
    addUser,
    updateUserByEmail,
    getUserByEmail,
    isUpdatedUser,
    getAllUsers,
    checkAdmin,
    makeAdmin,
    blockUserById,
} = require("../../api/User/user");
const router = require("express").Router();
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

router.post("/users", addUser);
router.get("/users/admin/:email", verifyToken, checkAdmin);
router.put("/users", verifyToken, updateUserByEmail);
router.get("/users/:email", verifyToken, getUserByEmail);
router.get("/users/isUpdated/:email", isUpdatedUser);
router.get("/users", getAllUsers);
router.patch("/users/admin/:id", verifyToken, verifyAdmin, makeAdmin);
router.patch("/users/block/:id", verifyToken, verifyAdmin, blockUserById);

module.exports = router;
