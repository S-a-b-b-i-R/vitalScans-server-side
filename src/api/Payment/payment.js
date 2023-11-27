const Booking = require("../../model/Booking");
const Payment = require("../../model/Payment");

const makePayment = async (req, res) => {
    try {
        const payment = req.body;
        const newPayment = new Payment(payment);
        await newPayment.save();
        const bookingId = req.body.bookingId;
        console.log(bookingId);
        await Booking.deleteOne({ _id: bookingId });
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
        const payment = await Payment.find(query);
        res.status(200).json({ payment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { makePayment, getPaymentByUserId };
