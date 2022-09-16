import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'interactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('userId').notNullable().unsigned().references('users.id').onDelete('CASCADE')
      table.integer('songId').unsigned().references('songs.id').onDelete('CASCADE')
      table.boolean('liked').notNullable()
      table.integer('playCount').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
