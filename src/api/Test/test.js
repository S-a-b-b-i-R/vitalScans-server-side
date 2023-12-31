const Test = require("../../model/Test");

const getAllTests = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const tests = await Test.find()
            .skip(page * limit)
            .limit(limit);
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

const getTotalNumOfTests = async (req, res) => {
    try {
        const totalNumOfTests = await Test.countDocuments();
        res.status(200).json({ totalNumOfTests });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTest = async (req, res) => {
    try {
        const result = await Test.deleteOne({ _id: req.params.id });
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTestById = async (req, res) => {
    try {
        const test = req.body;
        const id = req.params.id;
        const updatedTest = await Test.findByIdAndUpdate(id, test);
        res.status(200).json({ test: updatedTest });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTests,
    getTestById,
    addTest,
    getTotalNumOfTests,
    deleteTest,
    updateTestById,
};
