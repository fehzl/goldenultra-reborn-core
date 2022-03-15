import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clients extends BaseSchema {
  protected tableName = 'clients'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.enum('type', ['individual', 'company']).notNullable()
      table.string('CNPJ').nullable()
      table.string('CPF').nullable()
      table.string('RG').nullable()
      table.string('IE').nullable()
      table.date('birth').nullable()
      table.boolean('is_enabled').defaultTo(true)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
