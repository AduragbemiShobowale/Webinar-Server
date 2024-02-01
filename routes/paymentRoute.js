const express = require("express");
const initializePayment = require("../controllers/paystack");
const router = express.Router();


router.post("/acceptpayment", initializePayment.acceptPayment);

module.exports = router;
