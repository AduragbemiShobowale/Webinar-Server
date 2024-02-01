const mongoose = require("mongoose");

const paidUserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: [3, "First Name is too short"],
    },
    lastName: {
      type: String,
      minLength: [3, "Last Name is too Short"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide a Phone Number"],
      maxlength: [15, "Please provide a valid Phone Number"],
      match: [
        /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/,
        "Please provide a valid Phone Number",
      ],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an Email"],
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    package: {
      type: String,
      required: [true, "Please select a Package"],
      enum: ["Gold", "Platinum", "Diamond"],
      default: "Gold",
    },
  },
  {
    timestamps: true,
  }
);

paidUserSchema.virtual("amount").get(function () {
  const packageAmounts = {
    Gold: 50000,
    Platinum: 100000,
    Diamond: 150000,
  };
  return packageAmounts[this.package] || 0;
});

module.exports = mongoose.model("user", paidUserSchema);
