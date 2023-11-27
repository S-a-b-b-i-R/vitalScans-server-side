const mongoose = require("mongoose");
const { model, Schema } = mongoose;
mongoose.Promise = global.Promise;
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

module.exports = mongoose.models.Slot || mongoose.model("Slot", slotSchema);
