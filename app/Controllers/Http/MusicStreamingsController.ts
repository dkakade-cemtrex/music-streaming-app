import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Album from 'App/Models/Album'
import Artist from 'App/Models/Artist'
import Interaction from 'App/Models/Interaction'
import Playlist from 'App/Models/Playlist'
import Song from 'App/Models/Song'

export default class MusicStreamingsController {
  public async index({ view, auth }: HttpContextContract) {
    const albums = await Album.query().orderBy('updatedAt', 'desc').limit(6)
    const songs = await Song.query().preload('artist').orderBy('updatedAt', 'desc').limit(10)
    const indexData = {
      albums: albums,
      songs: songs,
    }
    return view.render('music-streaming/index', { indexData: indexData })
  }

  public async profile({ view, auth }: HttpContextContract) {
    const playlists = await Playlist.query().where('userId', auth.user?.id)
    const interactions = await Interaction.query()
      .where('userId', auth.user?.id)
      .preload('song', (s) => {
        s.preload('artist')
      })
    return view.render('music-streaming/my_profile', {
      playlists: playlists,
      interactions: interactions,
    })
  }

  public async myPlaylist({ view }: HttpContextContract) {
    const playlists = await Playlist.query().where('userId', '2')
    return view.render('music-streaming/playlist', { playlists: playlists })
  }

  public async playlist({ view }: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
