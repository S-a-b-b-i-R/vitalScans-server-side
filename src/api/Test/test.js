const Test = require("../../model/Test");

const getAllTests = async (req, res) => {
    try {
        const tests = await Test.find();
        res.status(200).json({ tests });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTestById = async (req, res) => {
    try {
        const id = req.params.id;
        const test = await Test.findById(id);
        res.status(200).json({ test });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addTest = async (req, res) => {
    try {
        const test = req.body;
        const newTest = new Test(test);
        await newTest.save();
        res.status(200).json({ test: newTest });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllTests, getTestById, addTest };
