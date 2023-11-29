const { model, Schema } = require("mongoose");

const promoSchema = new Schema(
    {
        title: {
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
    { timestamps: true, collection: "promoCollection" }
);

const Promo = model("promoCollection", promoSchema);

module.exports = Promo;
