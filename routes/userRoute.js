const express = require("express");
const userRegisterAndMail = require("../controllers/userController");

const router = express.Router();

router.post("/", userRegisterAndMail);

module.exports = router;
