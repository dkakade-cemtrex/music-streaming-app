import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { AlbumFactory, ArtistFactory, SongFactory, UserFactory } from 'Database/factories'

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      name: 'Darshani Kakade',
      email: 'dkakade@cemtrexlabs.com',
      isAdmin: true,
      password: 'Pass@1234',
    })
    await UserFactory.createMany(4)
    await ArtistFactory.createMany(5)
    await AlbumFactory.createMany(5)
    await SongFactory.createMany(5)
  }
}
