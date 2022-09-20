import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Interaction from 'App/Models/Interaction'
import Playlist from 'App/Models/Playlist'
import Song from 'App/Models/Song'

export default class PlaylistsController {
  public async index({ auth, view }: HttpContextContract) {
    const playlists = await Playlist.query().where('userId', auth.user?.id)
    return view.render('music-streaming/playlists', { playlists: playlists })
  }

  public async create({}: HttpContextContract) {}

  public async store({ response, request, auth }: HttpContextContract) {
    const name = request.input('playlistName')
    const playlists = request.input('playlists')
    const songId = request.input('songId')
    if (name) {
      const newPlaylist = await Playlist.create({
        name: name,
        userId: auth.user?.id,
        rules: 'no rule',
      })
      await newPlaylist.save()
      const song = await Song.find(songId)
      await song?.related('playlist').attach([newPlaylist.id])
    } else if (playlists) {
      for (const ids of playlists) {
        const playlist = await Playlist.find(ids)
        const song = await Song.find(songId)
        if (playlist && song) {
          await song.related('playlist').attach([playlist.id])
        }
      }
    }
    response.redirect(`/songs/${songId}`)
  }

  public async show({ view, request }: HttpContextContract) {
    const playlist = await Playlist.query()
      .where('id', request.param('id'))
      .preload('song', (p) => {
        p.preload('artist')
      })
    return view.render('music-streaming/playlists', {
      playlist: playlist,
    })
  }

  public async removeSong({ request, response }: HttpContextContract) {
    const playlistId = request.param('playlistId')
    const songId = request.param('songId')
    const playlist = await Playlist.find(playlistId)
    const song = await Song.find(songId)
    if (playlist && song) {
      await song.related('playlist').detach([playlist.id])
    }
    response.redirect(`/playlists/${playlistId}`)
  }

  public async update({}: HttpContextContract) {}

  public async destroy({ response, request }: HttpContextContract) {
    const playlist = await Playlist.findByOrFail('id', request.param('id'))
    await playlist.delete()
    response.redirect('/profile')
  }

  public async like({ response, request, auth }: HttpContextContract) {
    const songId = request.param('id')
    let interaction = await Interaction.query()
      .where('userId', auth.user?.id)
      .andWhere('songId', songId)
      .first()
    if (interaction) {
      await interaction.delete()
    } else {
      interaction = await Interaction.create({
        userId: auth.user?.id,
        songId: songId,
        playCount:1,
        liked: true,
      })
      await interaction.save()
    }
    response.redirect(`/songs/${songId}`)
  }
}
