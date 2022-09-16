import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import nodemailer from 'nodemailer'

export default class SendMailsController {
  public async index({ request, response }: HttpContextContract) {
    const to = request.input('to')
    const subject = request.input('subject')
    const body = request.input('body')
    console.table([to, subject, body])

    // let transporter = nodemailer.createTransport({
    //   sendmail: true,
    //   newline: 'unix',
    //   path: '/usr/sbin/sendmail',
    // })

    // await transporter.sendMail({
    //   to: to,
    //   subject: subject,
    //   text: body,
    // })

    await Mail.use('sendMailer').send((message) => {
      message.from('info@example.com').to(to).subject(subject).text(body)
    })

    return response.send('Please check your mail inbox')
  }

  public async templateMail({ request, response }: HttpContextContract) {
    const to = request.input('to')
    const subject = request.input('subject')
    const name = request.input('name')
    console.table([to, subject, name])

    await Mail.use('sendMailer').send((message) => {
      message
        .from('info@example.com')
        .to(to)
        .subject(subject)
        .htmlView('email/welcome', { name: name })
    })

    return response.send('Please check your mail inbox')
  }
}
// function use(arg0: string) {
//   throw new Error('Function not implemented.')
// }
