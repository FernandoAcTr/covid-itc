import nodemailer from 'nodemailer'
import { settings } from '../config/settings'
import { google } from 'googleapis'
import { ErrorHandler } from '../middlewares'
const { EMAIL_CREDENTIALS } = settings
const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
  EMAIL_CREDENTIALS.CLIENT_ID,
  EMAIL_CREDENTIALS.CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
)

oauth2Client.setCredentials({ refresh_token: EMAIL_CREDENTIALS.REFRESH_TOKEN })

export async function sendMail(
  from: string,
  to: string,
  subject: string,
  html: string,
  attachments?: Array<any>
): Promise<void> {
  try {
    const transporter = await createTransporter()
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
  } catch (error) {
    console.log(error)
  }
}

async function createTransporter() {
  const accessToken = await oauth2Client.getAccessToken()
  if (!accessToken.token)
    throw new ErrorHandler(500, 'Error al obtener un access token')
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, //true for 465, false for other ports
    auth: {
      type: 'OAuth2',
      user: EMAIL_CREDENTIALS.EMAIL,
      clientId: EMAIL_CREDENTIALS.CLIENT_ID,
      clientSecret: EMAIL_CREDENTIALS.CLIENT_SECRET,
      accessToken: accessToken.token,
      refreshToken: EMAIL_CREDENTIALS.REFRESH_TOKEN,
    },
  })

  return transporter
}
