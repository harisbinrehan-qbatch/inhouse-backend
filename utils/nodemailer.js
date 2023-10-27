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
    to: email,
    subject: 'Reset Password',
    html: `
      <h2>Reset Your Password</h2>
      <p>Hello,</p>
      <p>We received a request to reset your password of <b>Q-commerce</b>. To reset your password, please click the link below:</p>
      <p> <a href='http://localhost:3000/newPassword?token=${token}'>Click Here</a></p>
      <p>If you did not request a password reset, you can ignore this email.</p>
      <p>Thank you.</p>
    `,
  });
  console.log('Message sent: %s', info.messageId);
};

export default sendEmail;