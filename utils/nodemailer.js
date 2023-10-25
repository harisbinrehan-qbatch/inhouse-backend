import nodemailer from 'nodemailer';

const sendEmail = (email, token) => {
  var Transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'harisbinrehan@gmail.com',
      pass: 'ndus pdvl nktm dvcm',
    },
  });2
  var mailoptions;

  mailoptions = {
    from: 'harisbinrehan@gmail.com',
    to: email,
    subject: 'Reset Password',
    text: 'That was easy!',
    html: `Click <a href='http://localhost:3000/reset?token=${token}'>here</a> to verify the email.`,
  };
  Transport.sendMail(mailoptions, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log('success');
    }
  });
};
export default sendEmail;
