import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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
    const playlist = await Playlist.query().where('id', request.param('id')).preload('song',(p)=>{
      p.preload('artist')
    })
    console.log('playlists===>', playlist)
    // let playlistSongs: any[] = []

    // for (const p of playlist) {
    //   const pivot = await p.related('song').query().wherePivot('playlistId', p.id).preload('artist')
    //   playlistSongs.push(pivot)
    //   console.log('pivot===>', pivot)
    // }
    return view.render('music-streaming/playlists', {
      playlist: playlist,
      // playlistSongs: playlistSongs,
    })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
