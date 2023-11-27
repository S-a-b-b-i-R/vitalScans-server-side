const { model, Schema } = require("mongoose");

const bookingSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        slotId: {
            type: Schema.Types.ObjectId,
            ref: "slotCollection",
            required: true,
        },
        testId: {
            type: Schema.Types.ObjectId,
            ref: "testCollection",
            required: true,
        },
        discount: {
            type: Number,
        },
    },
    { timestamps: true, collection: "bookingCollection" }
);

const Booking = model("bookingCollection", bookingSchema);

module.exports = Booking;
