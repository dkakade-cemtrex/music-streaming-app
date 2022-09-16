import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class SocialAuthsController {
  public async login({ view }: HttpContextContract) {
    return view.render('music-streaming/sign_in')
  }

  public async create({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      response.redirect('/index')
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async register({ view }: HttpContextContract) {
    return view.render('music-streaming/sign_up')
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const name = request.input('name')
    const email = request.input('email')
    const password = request.input('password')

    const user = await User.create({
      name: name,
      email: email,
      password: password,
    })
    user.save()
    
    await auth.use('web').login(user)
    response.redirect('/index')
  }

  public async redirect({ ally }: HttpContextContract) {
    return ally.use('github').redirect()
  }

  public async callback({ ally, auth, response }: HttpContextContract) {
    const github = ally.use('github')
    /**
     * User has explicitly denied the login request
     */
    if (github.accessDenied()) {
      return 'Access was denied'
    }

    /**
     * Unable to verify the CSRF state
     */
    if (github.stateMisMatch()) {
      return 'Request expired. Retry again'
    }

    /**
     * There was an unknown error during the redirect
     */
    if (github.hasError()) {
      return github.getError()
    }

    const githubUser = await github.user()

    /**
     * FiSongd the user by email or create
     * a new one
     */
    const user = await User.firstOrCreate(
      {
        email: githubUser.email!,
      },
      {
        name: githubUser.name,
        accessToken: githubUser.token.token,
        isVerified: githubUser.emailVerificationState === 'verified',
        provider: 'github',
        providerId: githubUser.id,
      }
    )
    /**
     * Login user using the web guard
     */
    await auth.use('web').login(user)
    return response.redirect().toPath('/index')
  }

  public async gRedirect({ ally }: HttpContextContract) {
    console.log('first')
    return ally.use('google').redirect()
  }

  public async gCallback({ ally, auth, response }: HttpContextContract) {
    const google = ally.use('google')
    /**
     * User has explicitly denied the login request
     */
    if (google.accessDenied()) {
      return 'Access was denied'
    }

    /**
     * Unable to verify the CSRF state
     */
    if (google.stateMisMatch()) {
      return 'Request expired. Retry again'
    }

    /**
     * There was an unknown error during the redirect
     */
    if (google.hasError()) {
      return google.getError()
    }

    const googleUser = await google.user()

    /**
     * FiSongd the user by email or create
     * a new one
     */
    const user = await User.firstOrCreate(
      {
        email: googleUser.email!,
      },
      {
        name: googleUser.name,
        accessToken: googleUser.token.token,
        isVerified: googleUser.emailVerificationState === 'verified',
        provider: 'google',
        providerId: googleUser.id,
      }
    )
    /**
     * Login user using the web guard
     */
    await auth.use('web').login(user)
    return response.redirect('/index')
  }
}
