const { addUser, updateUserByEmail } = require("../../api/User/user");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

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
router.post("/users", addUser);
router.put("/users", verifyToken, updateUserByEmail);

module.exports = router;
