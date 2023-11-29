const Booking = require("../../model/Booking");
const Test = require("../../model/Test");

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

const getTopThreeTestFromBookings = async (req, res) => {
    try {
        //get top three test by number of bokkings, populate testId
        const topThreeTests = await Booking.aggregate([
            { $group: { _id: "$testId", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 3 },
        ]).exec();
        //using the top three test ids, populate the test details
        for (let i = 0; i < topThreeTests.length; i++) {
            const test = await Test.findById(topThreeTests[i]._id);
            topThreeTests[i].test = test;
        }

        res.status(200).json({ topThreeTests });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addBooking,
    getBookingsByEmail,
    getTopThreeTestFromBookings,
};
