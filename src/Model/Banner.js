const { model, Schema } = require("mongoose");

const bannerSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        coupon: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        collection: "bannerCollection",
    }
);

const Banner = model("bannerCollection", bannerSchema);

module.exports = Banner;
