const { model, Schema } = require("mongoose");

const serviceSchema = new Schema(
    {
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            default: true,
        },
    },
    { timestamps: true, collection: "serviceCollection" }
);

const Service = model("serviceCollection", serviceSchema);

module.exports = Service;
