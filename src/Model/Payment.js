const mongoose = require("mongoose");
const { model, Schema } = mongoose;
mongoose.Promise = global.Promise;

const paymentSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        paymentId: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
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
        status: {
            type: String,
            enum: ["pending", "success"],
            default: "pending",
        },
    },
    { timestamps: true, collection: "paymentCollection" }
);

module.exports =
    mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
