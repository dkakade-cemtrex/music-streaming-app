import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Album from 'App/Models/Album'
import Song from 'App/Models/Song'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'

export default class AlbumsController {
  public async index({ view, auth }: HttpContextContract) {
    const albums = await Album.query().orderBy('updatedAt', 'desc')
    console.log('user==>', auth.user)
    const indexData = {
      albums: albums,
    }
    return view.render('music-streaming/songs', { indexData: indexData })
  }

  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const coverImage = request.file('coverImage')!
    const album = await Album.create({
      artistId: request.input('artistId'),
      name: request.input('name'),
      cover: coverImage ? await Attachment.fromFile(coverImage) : null,
    })
    await album.save()
    return album
  }

  public async show({ request, view }: HttpContextContract) {
    const album = await Album.findByOrFail('id', request.param('id'))
    const songs = await Song.query().preload('artist').where('albumId', request.param('id'))
    return view.render('music-streaming/albumDetails', { album: album, songs: songs })
  }

  public async edit({}: HttpContextContract) {}

  public async update({ request }: HttpContextContract) {
    const album = await Album.findByOrFail('id', request.param('id'))
    const coverImage = request.file('coverImage')!
    if (coverImage) {
      ;(album.cover = coverImage ? await Attachment.fromFile(coverImage) : null), await album.save()
    }
    return album
  }

  public async destroy({}: HttpContextContract) {}
}
