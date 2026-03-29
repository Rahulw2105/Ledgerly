const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MONGO Connected");
    }
    catch(err) {
        console.log("Error:" , err.message);
    }
}

module.exports = connectDB;
