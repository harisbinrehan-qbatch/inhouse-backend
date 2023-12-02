import nodemailer from 'nodemailer';

const sendWelcomeEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587, // Use the correct port number
      secure: false,
      auth: {
        user: 'harisbinrehan@gmail.com',
        pass: 'sioj kqua nzey ybqu',
      },
    });

    const info = await transporter.sendMail({
      from: 'harisbinrehan@gmail.com',
      to: email,
      subject: 'Welcome to Q-commerce',
      html: `
          <h2>Welcome to <b>Q-commerce</b></h2>
        <p>Thank you for joining <b>Q-commerce</b>. We're excited to have you as a customer.</p>
        <p>Feel free to explore our website and let us know if you have any questions.</p>
      `,
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.log('Error sending welcome email:', error);
  }
};

export default sendWelcomeEmail;
