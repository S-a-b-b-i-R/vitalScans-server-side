const Report = require("../../Model/Report");

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
        res.status(500).json({ message: error.message });
    }
};

const getReportByPaymentId = async (req, res) => {
    try {
        const paymentId = req.params.paymentId;
        const report = await Report.findOne({
            paymentId: paymentId,
        })
            .populate("userId")
            .populate("testId");
        res.status(200).json({ report });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addReport,
    getReportByPaymentId,
};
