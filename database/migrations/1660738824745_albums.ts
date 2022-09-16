import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'albums'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('artistId')
        .notNullable()
        .unsigned()
        .references('artists.id')
        .onDelete('CASCADE')
      table.string('name', 255).notNullable()
      table.json('cover')
      table.timestamp('createdAt', { useTz: true })
      table.timestamp('updatedat', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
