const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
const sendEmail = async (email,otp,) => {
  try {
  const info = await transporter.sendMail({
    from: process.env.SMTP_USER ,
    to: email,
    subject: `Mã otp`, 
    text: `Otp của bạn là: ${otp}`,
    html: `<b>Otp của bạn là: ${otp}</b>`, // HTML body
  });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}
module.exports = sendEmail;