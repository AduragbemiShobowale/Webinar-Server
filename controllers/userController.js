const User = require("../models/register");
const customError = require("../utils/customError");
const confirmationEmail = require("../utils/emailModule");

const userRegisterAndMail = async (req, res, next) => {
  const { firstName, lastName, phoneNumber, email } = req.body;
  console.log(firstName);

  if (!firstName || !lastName || !phoneNumber || !email) {
    return next(customError(400, "Please provide all required fields"));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(customError(404, "User already exist"));
  }

  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
    });

    await confirmationEmail({
      email,
      firstName,
      lastName,
      phoneNumber,
    });

    return res
      .status(201)
      .json({ message: "User created, and email sent!", user: newUser });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Error in Creating A User", error: error.message });
  }
};

module.exports = userRegisterAndMail;
