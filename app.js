require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

const userRoute = require("./routes/userRoute");
const paymentRoute = require("./routes/paymentRoute");

app.use(cors());
app.use(express.json());

app.use("/api/register", userRoute);
app.use(paymentRoute);

// app.listen(port, () => {
//   console.log(`Server is listening on PORT:${port}`);
// });

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");
    app.listen(port, () => {
      console.log(`Server is listening on PORT:${port}`);
    });
  } catch (error) {
    console.log("Unable to connect");
  }
};

start();
