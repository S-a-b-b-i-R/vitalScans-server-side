const Report = require("../../Model/Report");
const Payment = require("../../Model/Payment");

const addReport = async (req, res) => {
    try {
        const report = req.body;
        const newReport = new Report(report);
        await newReport.save();
        //change payment status to success
        const paymentId = report.paymentId;
        const payment = await Payment.findOneAndUpdate(
            { _id: paymentId },
            { status: "success" }
        );
        res.status(200).json({ report: newReport });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addReport,
};
