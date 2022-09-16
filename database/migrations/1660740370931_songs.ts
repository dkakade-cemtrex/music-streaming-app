import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'songs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('albumId').notNullable().unsigned().references('albums.id').onDelete('CASCADE')
      table.integer('artistId').unsigned().references('artists.id').onDelete('CASCADE')
      table.string('title', 255).notNullable()
      table.json('image')
      table.float('length').notNullable()
      table.integer('track')
      table.integer('disc')
      table.string('lyrics', 255)
      table.string('path', 255)
      table.integer('mtime')
      table.timestamp('createdAt', { useTz: true })
      table.timestamp('updatedat', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
