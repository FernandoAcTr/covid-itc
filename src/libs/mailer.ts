import nodemailer from 'nodemailer'
import { settings } from '../config/settings'
const { EMAIL_CREDENTIALS } = settings

export function sendMail(
  from: string,
  to: string,
  subject: string,
  html: string,
  attachments?: Array<any>
): void {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, //true for 465, false for other ports
    auth: {
      type: 'OAuth2',
      user: EMAIL_CREDENTIALS.EMAIL,
      clientId: EMAIL_CREDENTIALS.CLIENT_ID,
      clientSecret: EMAIL_CREDENTIALS.CLIENT_SECRET,
      accessToken: EMAIL_CREDENTIALS.ACCESS_TOKEN,
      refreshToken: EMAIL_CREDENTIALS.REFRESH_TOKEN,
    },
  })

  transporter
    .sendMail({
      from, // sender address
      to, // list of receivers
      subject, // Subject line
      html, // html body
      attachments,
    })
    .then((info) => console.log(info))
    .catch((err) => console.error(err))
}
