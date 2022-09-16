/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/send-mail', async ({ view }) => {
  return view.render('email/sendMailForm')
})

Route.post('/send-mail', 'SendMailsController.index')

Route.group(() => {
  Route.get('/send-mail', async ({ view }) => {
    return view.render('email/sendMailWithTemplateForm')
  })

  Route.post('/send-mail', 'SendMailsController.templateMail')
}).prefix('/template')

Route.group(() => {
  Route.post('/users', 'UsersController.store') //register/ create user
  Route.resource('auth', 'AuthController')
    .middleware({
      destroy: ['auth'],
    })
    .only(['show', 'destroy', 'store'])
    .as('auth')
  Route.get('/register', 'SocialAuthsController.register')
  Route.post('/register', 'SocialAuthsController.store')
  Route.get('/login', 'SocialAuthsController.login')
  Route.post('/login', 'SocialAuthsController.create')
  Route.get('/login/github', 'SocialAuthsController.redirect')
  Route.get('/login/github/callback', 'SocialAuthsController.callback')
  Route.get('/login/google', 'SocialAuthsController.gRedirect')
  Route.get('/login/google/callback', 'SocialAuthsController.gCallback')

  Route.post('/logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    response.redirect('/index')
  })
})

Route.group(() => {
  Route.get('/index', 'MusicStreamingsController.index')
  Route.resource('/albums', 'AlbumsController')
  Route.resource('/songs', 'SongsController')
})

Route.group(() => {
  Route.get('/profile', 'MusicStreamingsController.profile')
  Route.get('/my-playlists', 'MusicStreamingsController.myPlaylist')
  Route.resource('/playlists', 'PlaylistsController')
}).middleware('auth')
