import 'dotenv/config';
import sgMail from '@sendgrid/mail';

export function sendResetMail(email, password, token) {
  const url = `${process.env.HOSTNAME}/reset?token=${token}&email=${email}&key=${password}`;

  const text = `Se você solicitou uma recuperação de senha, clique <a href='"${url}"'>aqui</a>.`;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: 'lage.gabriel@edu.unirio.br',
    subject: 'Sending with SendGrid is Fun',
    text: text,
    html: text,
  };
  sgMail.send(msg);
}
