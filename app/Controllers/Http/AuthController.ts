import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async index({}: HttpContextContract) {}

  public async store({request,auth,response}: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('web').attempt(email, password)

      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async show({request,auth,response}: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('web').attempt(email, password)

      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async update({}: HttpContextContract) {}

  public async destroy({auth}: HttpContextContract) {
    if (auth.user) {
      await auth.use('web')
      return {
        revoked: true,
      }
    } else {
      return { revoked: false }
    }
  }
}
