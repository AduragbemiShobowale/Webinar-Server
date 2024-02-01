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
    const emailBody = `<div
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: auto;
    "
  >
    <div style="width: 38%; text-align: center">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          background-color: black;
        "
      >
        <img src="./Group.svg" alt="" style="height: auto" />
        <h3>The Ultimate Academy Launch</h3>
      </div>
      <div style="background-color: #f1f2fe; padding: 32px 0; color: black; display: flex; flex-direction: column; align-items: center; gap: 24px;">
        <img
          src="./Frame 1000003375.svg"
          alt=""
          style="display: block; margin: auto"
        />
        <h3 style="padding:0 86px">
          Congratulations, ${firstName}!🎉 You're officially part of our
          upcoming Exclusive Webinar Experience
        </h3>
        <p style="padding: 0 70px;">
          Lorem ipsum dolor sit amet consectetur. Habitant aliquet suscipit
          sed facilisi sit. Nibh at nisl augue viverra vitae amet orci lorem.
          Luctus faucibus laoreet eu parturient in. Elementum consectetur enim
          fames velit sit donec.
        </p>
        <a
          href="https://meet.google.com/mio-jswu-gto"
          style="
            display: inline-block;
            padding: 12px 150px;
            background-color: #2f40d5;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
          "
          >Start Meeting</a
        >
      </div>
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
