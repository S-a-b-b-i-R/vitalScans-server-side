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
                { slot: slot.slot }
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

module.exports = { addUpdateSlot };
