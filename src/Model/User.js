const { model, Schema } = require("mongoose");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        bloodGroup: {
            type: String,
        },
        district: {
            type: Number,
        },
        upazilla: {
            type: Number,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "userCollection",
    }
);

const User = model("userCollection", userSchema);

module.exports = User;
