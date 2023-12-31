const User = require("../../model/User");

const addUser = async (req, res) => {
    try {
        const user = req.body;
        const ifExists = await User.findOne({ email: user.email });
        if (ifExists) {
            return res.status(400).json({ message: "User already exists" });
        } else {
            const newUser = new User(user);
            newUser.role = "user";
            await newUser.save();
            res.status(200).json({ user });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const updateUserByEmail = async (req, res) => {
    try {
        const user = req.body;
        await User.findOneAndUpdate(
            { email: user.email },
            {
                name: user.name,
                bloodGroup: user.blood_group,
                district: parseInt(user.zilla_id),
                upazilla: parseInt(user.upazilla_id),
            }
        );
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email: email });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const isUpdatedUser = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email: email });
        if (user.bloodGroup && user.district && user.upazilla) {
            res.status(200).json({ isUpdated: true });
        } else {
            res.status(200).json({ isUpdated: false });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const checkAdmin = async (req, res) => {
    const email = req.params.email;
    if (email !== req.decoded.email) {
        return res.status(403).send({ message: "Unauthorized Access" });
    }
    const query = { email: email };
    const user = await User.findOne(query);
    const isAdmin = user?.role === "admin";
    res.status(200).json({ isAdmin });
};

const makeAdmin = async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.params.id }, { role: "admin" });
        res.status(200).json({ message: "success" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const blockUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const isActive = user.isActive;
        await User.findByIdAndUpdate(req.params.id, { isActive: !isActive });
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addUser,
    updateUserByEmail,
    getUserByEmail,
    isUpdatedUser,
    getAllUsers,
    checkAdmin,
    makeAdmin,
    blockUserById,
};
