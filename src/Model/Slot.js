const { model, Schema } = require("mongoose");

const slotSchema = new Schema(
    {
        testDate: {
            type: Date,
            required: true,
        },
        testId: {
            type: Schema.Types.ObjectId,
            ref: "testCollection",
            required: true,
        },
        slotNum: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true, collection: "slotCollection" }
);

const Slot = model("slotCollection", slotSchema);

module.exports = Slot;
