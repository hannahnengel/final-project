const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PSWD
  }
});

module.exports = {
  sendUserEmail: async function sendUserEmail(name, userEmail, link, token) {
    try {
      const info = await transporter.sendMail({
        from: `HateMate <${process.env.GMAIL_EMAIL}>`,
        to: userEmail,
        subject: `Update your HateMate password, ${name}!`,
        text: 'Hello World!',
        html:
        `
        <p>Hello ${name},<p/>
        <p>Please reset your password here: <b style="color:#ab1716">${link}}<b>
        <br/> <span>Please note, this token will expire in 15 minutes.</span></b></p>
        <br/>
        <p style="color:#6d6969"><small>Do not reply to this email</small></p>
         <a href="https://hate-mate.hate-mate.com/">
          <img style={width:150px} src="cid:uniq-HateMate_Logo.png" alt="HateMate">
        </a>
        `,
        attachments: [
          {
            filename: 'HateMate_Logo.png',
            path: path.join(__dirname, '/public/logo_img/HateMate_Logo.png'),
            cid: 'uniq-HateMate_Logo.png'
          }
        ]
      });
      return info.messageId;
    } catch (err) {
      console.error(err);
    }
  }
};
