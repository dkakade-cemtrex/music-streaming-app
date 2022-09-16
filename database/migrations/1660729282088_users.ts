import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).nullable()
      table.boolean('isAdmin').defaultTo(false)
      table.string('provider')
      table.string('providerId')
      table.string('accessToken', 255)
      table.boolean('isVerified')
      table.string('preferences', 355)
      table.string('rememberMeToken')
      table.timestamp('createdAt', { useTz: true })
      table.timestamp('updatedAt', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
