const Slot = require("../../model/Slot");
const Booking = require("../../model/Booking");
const Payment = require("../../model/Payment");

const makePayment = async (req, res) => {
    try {
        const payment = req.body;
        const newPayment = new Payment(payment);
        await newPayment.save();
        const bookingId = req.body.bookingId;
        const slotId = req.body.slotId;
        await Slot.findByIdAndUpdate(slotId, { $inc: { slotNum: -1 } });
        res.status(200).json({ payment: newPayment });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const getPaymentByUserId = async (req, res) => {
    try {
        const query = { email: req.params.email };
        if (req.decoded.email !== req.params.email) {
            res.sendStatus(403).send({ message: "Forbidden Access" });
        }
        const payment = await Payment.find(query).populate("testId");
        res.status(200).json({ payment });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

const getPaymentSuccessByUserId = async (req, res) => {
    try {
        if (req.decoded.email !== req.params.email) {
            res.sendStatus(403).send({ message: "Forbidden Access" });
        }
        const payment = await Payment.find({
            email: req.params.email,
            status: "success",
        }).populate("testId");
        res.status(200).json({ payment });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate("testId");
        return res.status(200).json({ payments });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
};

const getPaymnetById = async (req, res) => {
    try {
        const id = req.params.id;
        const payment = await Payment.findById(id).populate("testId");
        res.status(200).json({ payment });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

const cancelPaymentById = async (req, res) => {
    try {
        const id = req.params.id;
        const payment = await Payment.findById(id);
        if (payment.status === "success") {
            return res.status(400).json({ message: "Test already done" });
        }
        const slotId = payment.slotId;
        await Slot.findByIdAndUpdate(slotId, { $inc: { slotNum: 1 } });
        await Payment.findByIdAndDelete(id);
        res.status(200).json({ message: "success" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

// get total slaes by test, number of tests of each test, total sales
const salesStats = async (req, res) => {
    try {
        const totalSalesByTest = await Payment.aggregate([
            {
                $lookup: {
                    from: "testCollection",
                    localField: "testId",
                    foreignField: "_id",
                    as: "testDetails",
                },
            },
            {
                $unwind: "$testDetails",
            },
            {
                $group: {
                    _id: "$testId",
                    testTitle: { $first: "$testDetails.title" },
                    totalBooked: { $sum: 1 },
                    totalSales: { $sum: "$amount" },
                },
            },
        ]);

        res.status(200).json({
            totalSalesByTest,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const searchPaymentByUserEmail = async (req, res) => {
    try {
        const email = req.params.email;
        if (email === "null") {
            const payments = await Payment.find().populate("testId");
            return res.status(200).json({ payments });
        }
        const payments = await Payment.find({
            email: { $regex: email, $options: "i" },
        }).populate("testId");
        res.status(200).json({ payments });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    makePayment,
    getPaymentByUserId,
    getAllPayments,
    getPaymnetById,
    getPaymentSuccessByUserId,
    cancelPaymentById,
    salesStats,
    searchPaymentByUserEmail,
};
