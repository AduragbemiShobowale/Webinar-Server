const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAIL_EMAIL,
    pass: process.env.NODEMAIL_PASSWORD,
  },
});

const confirmationEmail = async ({
  firstName,
  lastName,
  phoneNumber,
  email,
}) => {
  try {
    const emailBody = `<p style="padding: 0 70px;">
    Lorem ipsum dolor sit amet consectetur. Habitant aliquet suscipit
    sed facilisi sit. Nibh at nisl augue viverra vitae amet orci lorem.
    Luctus faucibus laoreet eu parturient in. Elementum consectetur enim
    fames velit sit donec.
  </p>`;

    const info = await mailTransporter.sendMail({
      from: process.env.NODEMAIL_EMAIL,
      to: email,
      subject: `Congratulations, ${firstName} ${lastName}! with Phone Number: ${phoneNumber}`,
      html: emailBody,
    });

    console.log("Email Successfully Sent", info.messageId);
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error sending email: ${error.message}`);
  }
};

module.exports = confirmationEmail;
