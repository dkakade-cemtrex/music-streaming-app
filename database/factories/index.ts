import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import Artist from 'App/Models/Artist'
import Album from 'App/Models/Album'
import Song from 'App/Models/Song'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: 'Pass@1234',
  }
}).build()

export const ArtistFactory = Factory.define(Artist, ({ faker }) => {
  return {
    name: faker.name.firstName(),
  }
}).build()

export const AlbumFactory = Factory.define(Album, ({ faker }) => {
  return {
    artistId: faker.datatype.number({ min: 1, max: 5 }),
    name: faker.name.firstName(),
  }
}).build()

export const SongFactory = Factory.define(Song, ({ faker }) => {
  return {
    albumId: faker.datatype.number({ min: 1, max: 5 }),
    artistId: faker.datatype.number({ min: 1, max: 5 }),
    title: faker.lorem.words(4),
    length: faker.datatype.float({ min: 1, max: 10, precision: 0.01 }),
    disc: faker.datatype.number({ min: 1, max: 5 }),
    lyrics: faker.lorem.words(10),
    path: faker.helpers.arrayElement([
      'http://localhost:3333/mario.mp3',
      'http://localhost:3333/got_intro.mp3',
    ]),
    mtime: faker.datatype.number({ min: 1, max: 5 }),
  }
}).build()
