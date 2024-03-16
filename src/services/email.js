import nodemailer from 'nodemailer';

export async function sendEmail() {

  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: "",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });
  const info = await transporter.sendMail({
    from: '"yazan Ecommerce 👻"', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}