import 'dotenv/config';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';

export function sendResetMail(email) {
  const token = crypto.randomBytes(32).toString('base64').slice(0, 32);
  const url = `
    ${process.env.HOSTNAME}
    /login/reset
    ?token=${token}
    &email=${email}
  `;
  const text = `
    Se você solicitou uma recuperação de senha, 
    clique <a href='"${url}"'>aqui</a>.
  `;

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
