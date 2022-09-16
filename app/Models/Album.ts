import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Artist from './Artist'

import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'

export default class Album extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public artistId: number

  @column()
  public name: string

  @attachment({ preComputeUrl: true })
  public cover: AttachmentContract | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Artist)
  public artist: BelongsTo<typeof Artist>
}
