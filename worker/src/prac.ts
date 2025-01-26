import dotenv from "dotenv";

// Load environment variables
dotenv.config();
import nodemailer from "nodemailer";

// console.log(process.env.SMTP_USERNAME+"hellllllllllllllllllllllllllllllllll")
const transport = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user:"82fd96001@smtp-brevo.com",
      pass:"LZxsaRTMphAwUjcV",
    },
    logger:true,
    debug:true
  });
// Send a test email
async function testSMTP() {
  try {
    const info = await transport.sendMail({
      from: "saumyaydv22@gmail.com", 
      to: "saumyaydv22@gmail.com", 
      subject: "Test Email", 
      text: "This is a test email to check if the SMTP server is working.",
    });
    console.log("Test email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

testSMTP();
