const express = require("express");
const mongoose = require("mongoose");
const app = express();

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/restaurent")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Schema
const orderSchema = mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  currentLocation: {
    type: String,
    required: true,
  },
  orderTime: {
    type: String,
    required: true,
  },
  estimateTime: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  currentTime: {
    type: String,
    required: true,
  },
  currentDistance: {
    type: String,
    required: true,
  },
  currentEstimateTime: {
    type: String,
    required: true,
  },
});

// Modal
const Order = mongoose.model("orders", orderSchema);

// Middleware
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send("Hey")
})

app.get("/orderInfo", async (req, res) => {
  const orderDetails = await Order.find({});
  const html = `
    <ul>
        ${orderDetails.map((item) => `<li>${item}</li>`)}
    </ul>
  `
  res.send(html);
});

app.post("/orderDetails", async (req, res) => {
  if (
    !req.body ||
    !req.body.orderId ||
    !req.body.profile ||
    !req.body.currentLocation ||
    !req.body.orderTime ||
    !req.body.estimateTime ||
    !req.body.distance ||
    !req.body.currentTime ||
    !req.body.currentDistance ||
    !req.body.currentEstimateTime
  ) return res.status(400).json({ msg: "all fields are require" });

  const order = await Order.create({
    orderId: req.body.orderId,
    profile: req.body.profile,
    currentLocation: req.body.currentLocation,
    orderTime: req.body.orderTime,
    estimateTime: req.body.estimateTime,
    distance: req.body.distance,
    currentTime: req.body.currentTime,
    currentDistance: req.body.currentDistance,
    currentEstimateTime: req.body.currentEstimateTime
  })

  res.status(201).json({order});
});

app.listen(3000, () => console.log("sever is runing"));
