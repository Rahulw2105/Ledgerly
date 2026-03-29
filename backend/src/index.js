require("dotenv").config();
const express = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser");
const connectDB = require("./config/Db")
const authRoutes = require('./routes/authRoutes');
const app = express();

//console.log(app);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);

const port = process.env.PORT || 5000
connectDB();
app.listen (port , () => {
    console.log("Server is running");
})