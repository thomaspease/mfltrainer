const nodemailer = require('nodemailer');
//require('dotenv').config();

const sendEmail = async (options) => {
  //1) Create a transporter ("Gmail" could also be the host, you would need to set gmail to let unsecure apps use me or smth)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //2) Define the email options
  const mailOptions = {
    from: 'Tom Pease <tompease95@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html:
  };
  //3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
