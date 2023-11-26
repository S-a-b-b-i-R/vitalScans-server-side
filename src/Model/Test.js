const { model, Schema } = require("mongoose");

const testSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        details: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        preparation: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, collection: "testCollection" }
);

const Test = model("testCollection", testSchema);

module.exports = Test;
