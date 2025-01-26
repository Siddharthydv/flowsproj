import nodemailer from "nodemailer";
// SOL_PRIVATE_KEY=""
// SMTP_USERNAME=""
// SMTP_PASSWORD=""
// SMTP_ENDPOINT

const transport = nodemailer.createTransport({
    host: process.env.SMTP_ENDPOINT || "smtp-relay.brevo.com" ,
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.SMTP_USERNAME || "82fd96001@smtp-brevo.com",
      pass: process.env.SMTP_PASSWORD || "LZxsaRTMphAwUjcV",
    },
  });

export async function sendEmail(to: string, body: string) {
  console.log(to)
    await transport.sendMail({
        from: to || "saumyaydv22@gmail.com",
        sender: "saumyaydv22@gmail.com",
        to,
        subject: "Issue Raised",
        text: body
    })
}
