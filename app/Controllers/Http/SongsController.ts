import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Album from 'App/Models/Album'
import Artist from 'App/Models/Artist'
import Playlist from 'App/Models/Playlist'
import Song from 'App/Models/Song'

export default class SongsController {
  public async index({ view }: HttpContextContract) {
    const songs = await Song.query().preload('artist').orderBy('updatedAt', 'desc')
    console.log('songs', songs)
    const indexData = {
      songs: songs,
    }
    return view.render('music-streaming/songs', { indexData: indexData })
  }

  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const coverImage = request.file('coverImage')!
    const song = await Song.create({
      artistId: request.input('artistId'),
      albumId: request.input('albumId'),
      title: request.input('title'),
      track: request.input('track'),
      length: request.input('length'),
      image: coverImage ? await Attachment.fromFile(coverImage) : null,
    })
    await song.save()
    return song
  }

  public async show({ request, view, auth }: HttpContextContract) {
    const song = await Song.findByOrFail('id', request.param('id'))
    const artist = await Artist.findByOrFail('id', song.artistId)
    const album = await Album.findByOrFail('id', song.albumId)
    let playlists: any[] = []
    if (auth.user) {
      playlists = await Playlist.query().where('userId', auth.user?.id)
    }
    return view.render('music-streaming/songDetails', {
      song: song,
      artist: artist,
      album: album,
      playlists: playlists,
    })
  }

  public async edit({}: HttpContextContract) {}

  public async update({ request }: HttpContextContract) {
    const song = await Song.findByOrFail('id', request.param('id'))
    const coverImage = request.file('coverImage')!
    if (coverImage) {
      song.image = coverImage ? await Attachment.fromFile(coverImage) : null
      await song.save()
    }
    song.load('album')
    return song
  }

  public async destroy({}: HttpContextContract) {}
}
