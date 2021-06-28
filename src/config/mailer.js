const nodeMailer = require('nodemailer');

let adminEmail = process.env.MAIL_USER;
let adminPassword = process.env.MAIL_PASSWORD;
let mailHost = process.env.MAIL_HOST;
let mailPort = process.env.MAIL_PORT;

let sendMail = (to, subject, htmlContent) => {
  let transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, // true for 465, false for other ports 
    auth: {
      user: adminEmail,
      pass: adminPassword
    },
  });
  let mailOption = {
    from: adminEmail,
    to: to,
    subject: subject,
    html: htmlContent
  };
  return transporter.sendMail(mailOption);
};

module.exports = sendMail;
