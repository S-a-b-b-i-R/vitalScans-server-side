const jwt = require("jsonwebtoken");
require("dotenv").config();

const createAuthToken = async (req, res, next) => {
    try {
        const user = req.body;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "20h",
        });
        res.send({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = createAuthToken;
