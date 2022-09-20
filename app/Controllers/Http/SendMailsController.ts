import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class SendMailsController {
  public async getSendMail({ view }: HttpContextContract) {
    return view.render('email/sendMailForm')
  }

  public async sendMail({ request, response }: HttpContextContract) {
    const to = request.input('to')
    const subject = request.input('subject')
    const body = request.input('body')

    if (to && body && subject) {
      await Mail.use('sendMailer').send((message) => {
        message.from('info@example.com').to(to).subject(subject).text(body)
      })
      return response.send('Please check your mail inbox')
    } else {
      return response.send('Please fill the form correctly')
    }
  }

  public async tGetSendMail({view}: HttpContextContract) {
    return view.render('email/sendMailWithTemplateForm')
  }

  public async templateMail({ request, response }: HttpContextContract) {
    const to = request.input('to')
    const subject = request.input('subject')
    const name = request.input('name')

    if (to && name && subject) {
      await Mail.use('sendMailer').send((message) => {
        message
          .from('info@example.com')
          .to(to)
          .subject(subject)
          .htmlView('email/welcome', { name: name })
      })
      return response.send('Please check your mail inbox')
    } else {
      return response.send('Please fill the form correctly')
    }
  }
}
