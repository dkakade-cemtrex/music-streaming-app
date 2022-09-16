import { DateTime } from 'luxon'
import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Album from './Album'
import Artist from './Artist'
import Playlist from './Playlist'
import {
  responsiveAttachment,
  ResponsiveAttachmentContract,
} from '@ioc:Adonis/Addons/ResponsiveAttachment'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'

export default class Song extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public albumId: number

  @column()
  public artistId: number

  @column()
  public title: string

  @attachment({ preComputeUrl: true })
  public image: AttachmentContract | null

  @column()
  public length: number

  @column()
  public track: number

  @column()
  public disc: number

  @column()
  public lyrics: string

  @column()
  public path: string

  @column()
  public mtime: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Artist)
  public artist: BelongsTo<typeof Artist>

  @belongsTo(() => Album)
  public album: BelongsTo<typeof Album>

  @manyToMany(() => Playlist, {
    pivotTable: 'playlistSongs',
  })
  public playlist: ManyToMany<typeof Playlist>
}
