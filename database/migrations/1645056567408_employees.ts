import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Employees extends BaseSchema {
  protected tableName = 'employees'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.string('name')
      table.string('email')
      table.string('CPF')
      table.string('RG')
      table.string('CTPS')
      table.string('role')
      table.date('birth')
      table.date('admission')
      table.date('dismissal').nullable()
      table.boolean('can_login').defaultTo(true)
      table.boolean('is_enabled').defaultTo(true)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
