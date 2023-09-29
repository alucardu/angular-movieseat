const nodemailer = require('nodemailer');
const dotenvParseVariables = require('dotenv-parse-variables');
const dotenv = require('dotenv');
let env = dotenv.config({});
const ejs = require('ejs');
env = dotenvParseVariables(env.parsed);

const transporter = nodemailer.createTransport({
  host: env.PROD_MAIL_HOST,
  secure: env.PROD_MAIL_SECURE,
  secureConnection: false, // TLS requires secureConnection to be false
  requireTLS: env.PROD_REQUIRE_TLS,
  port: env.PROD_PORT,
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
  logger: true,
  debug: true,
  auth: {
    user: process.env.MAIL_ACCOUNT,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendEmail = (email) => {
  const receiver = email.to
  const variables = email.variables

  if (variables.type === 'confirmation') {
    ejs.renderFile(__dirname + '/templates/confirmation.ejs', { receiver, variables }, (err, data) => {
      if (err) {
        console.log('error')
      } else {
        var mailOptions = {
          from: email.from,
          to: email.to,
          subject: email.subject,
          html: data
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
        });
      }
    });
  }
};

module.exports = {sendEmail};
