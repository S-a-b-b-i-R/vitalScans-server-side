const Booking = require("../../model/Booking");

const addBooking = async (req, res) => {
    try {
        const booking = req.body;
        const newBooking = new Booking(booking);
        await newBooking.save();
        res.status(200).json({ booking: newBooking });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const getBookingsByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const bookings = await Booking.find({ userId: email }).populate(
            "testId"
        );
        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addBooking, getBookingsByEmail };
