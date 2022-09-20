import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'playlistSongs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('playlistId')
        .notNullable()
        .unsigned()
        .references('playlists.id')
        .onDelete('CASCADE')
      table.integer('songId').notNullable().unsigned().references('songs.id').onDelete('CASCADE')
      table.timestamp('createdAt', { useTz: true })
      table.timestamp('updatedAt', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
