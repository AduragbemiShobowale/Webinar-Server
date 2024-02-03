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
    const emailBody = `<div style="text-align: center; background-color: #f1f2fe; margin: auto;">
    <div style="background-color: black; color: white;">
      <h2>The Ultimate Academy Launch</h2>
    </div>
    <div>
      <h2>
        Congratulations Temi! 🎉 You're officially part of our upcoming
        Exclusive Webinar Experience.
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur. Habitant aliquet suscipit sed
        facilisi sit. Nibh at nisl augue viverra vitae amet orci lorem. Luctus
        faucibus laoreet eu parturient in. Elementum consectetur enim fames
        velit sit donec.
      </p>
    </div>
  </div>`;

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
