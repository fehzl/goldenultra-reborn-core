import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClientAddresses extends BaseSchema {
  protected tableName = 'client_addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('client_id').references('id').inTable('clients').onDelete('CASCADE')
      table.string('street').notNullable()
      table.string('number').notNullable()
      table.string('complement').nullable()
      table.string('reference').nullable()
      table.string('neighborhood').notNullable()
      table.string('city').notNullable()
      table.string('UF').notNullable()
      table.string('CEP').notNullable()
      table.enum('type', ['home', 'work']).notNullable()
      table.boolean('is_primary').notNullable().defaultTo(true)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
