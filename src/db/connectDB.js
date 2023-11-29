const mongoose = require("mongoose");
require("dotenv").config();

const getConnectionString = () => {
    let connectionUrl;
    connectionUrl = process.env.DATABASE_LOCAL;
    connectionUrl = connectionUrl.replace("<username>", process.env.DB_USER);
    connectionUrl = connectionUrl.replace(
        "<password>",
        process.env.DB_PASSWORD
    );

    return connectionUrl;
};

const connectDB = async () => {
    console.log("connecting to database");
    const mongoURI = getConnectionString();

    await mongoose.connect(mongoURI, { dbName: process.env.DB_NAME });
    console.log("connected to database");
};

module.exports = connectDB;
