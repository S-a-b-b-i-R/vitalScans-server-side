const Slot = require("../../Model/Slot");

const addUpdateSlot = async (req, res) => {
    try {
        const slot = req.body;
        const ifExists = await Slot.findOne({
            testId: slot.testId,
            testDate: slot.testDate,
        });
        if (ifExists) {
            const updatedSlot = await Slot.findOneAndUpdate(
                { testId: slot.testId, testDate: slot.testDate },
                { slotNum: slot.slotNum }
            );
            res.status(200).json({ slot: updatedSlot });
        } else {
            const newSlot = new Slot(slot);
            const result = await newSlot.save();
            res.status(200).json({ newSlot });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllSlots = async (req, res) => {
    try {
        const slots = await Slot.find().populate("testId");
        res.status(200).json({ slots });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSlotById = async (req, res) => {
    try {
        const id = req.params.id;
        const slot = await Slot.findById(id).populate("testId");
        res.status(200).json({ slot });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get all tests available in between a specific date range
const getSlotsByDateRange = async (req, res) => {
    try {
        const startDate = req.params.startDate;
        const endDate = req.params.endDate;
        if (!startDate || !endDate) {
            const slots = await Slot.find().populate("testId");
            return res.status(200).json({ slots });
        }
        const slots = await Slot.find({
            testDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
        }).populate("testId");

        res.status(200).json({ slots });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addUpdateSlot,
    getAllSlots,
    getSlotById,
    getSlotsByDateRange,
};
