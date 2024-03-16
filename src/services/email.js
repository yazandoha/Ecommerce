import nodemailer from 'nodemailer';

export async function sendEmail(dest,subject,message) {

  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: `${process.env.SENDEREMAIL}`,
      pass: `${process.env.SENDERPASSWORD}`,
    },
  });
  const info = await transporter.sendMail({
    from: '"yazan Ecommerce 👻"', // sender address
    to: dest, // list of receivers
    subject: subject, // Subject line
    text: "Hello world?", // plain text body
    html: message, // html body
  });
 return info;
}