import nodemailer from 'nodemailer';

const sendEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 485,
    secure: false,
    auth: {
      user: 'harisbinrehan@gmail.com',
      pass: 'sioj kqua nzey ybqu',
    },
  });

  const info = await transporter.sendMail({
    from: 'harisbinrehan@gmail.com',
    to : email,
    subject : 'Reset Password',
    html: `Click <a href='http://localhost:3000/reset?token=${token}'>here</a> to verify the email`, 
  });
  console.log('Message sent: %s', info.messageId);
};
export default sendEmail;
