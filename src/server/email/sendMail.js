const nodemailer = require('nodemailer');
const dotenvParseVariables = require('dotenv-parse-variables');
const dotenv = require('dotenv');
let env = dotenv.config({});
env = dotenvParseVariables(env.parsed);

async function main(email) {
  if (!email) {
    return;
  }

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

  // send mail with defined transport object
  const info = await transporter.sendMail(email);

  console.log('Message sent: %s', info.messageId);
}

main().catch(console.error);

module.exports = {main};
