import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.string('code').unique().notNullable()
      table.uuid('employee_id').notNullable().references('id').inTable('employees')
      table.uuid('client_id').notNullable().references('id').inTable('clients')
      table
        .enum('situation', ['PENDING', 'PAID_PARTIAL', 'PAID', 'SEPARATED', 'DELIVERED'])
        .notNullable()
        .defaultTo('PENDING')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
