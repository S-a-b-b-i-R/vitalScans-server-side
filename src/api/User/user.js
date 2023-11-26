const User = require("../../Model/User");

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
        console.log(user);
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

module.exports = { addUser, updateUserByEmail };
