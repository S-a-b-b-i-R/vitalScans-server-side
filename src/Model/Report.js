const { model, Schema } = require("mongoose");

const reportSchema = new Schema(
    {
        paymentId: {
            type: Schema.Types.ObjectId,
            ref: "paymentCollection",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "userCollection",
            required: true,
        },
        testId: {
            type: Schema.Types.ObjectId,
            ref: "testCollection",
            required: true,
        },
        testDate: {
            type: Date,
            required: true,
        },
        results: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: "reportCollection",
    }
);

const Report = model("reportCollection", reportSchema);

module.exports = Report;
