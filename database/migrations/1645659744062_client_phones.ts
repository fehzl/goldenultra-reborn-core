import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClientPhones extends BaseSchema {
  protected tableName = 'client_phones'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('client_id').references('id').inTable('clients').onDelete('CASCADE')
      table.string('number').notNullable()
      table.enum('type', ['mobile', 'home', 'work']).notNullable()
      table.boolean('is_primary').notNullable().defaultTo(true)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
