import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.string('code').unique().notNullable()
      table.uuid('employee_id').notNullable().references('id').inTable('users')
      table.uuid('client_id').notNullable().references('id').inTable('users')
      table.boolean('is_paid').notNullable().defaultTo(false)
      table.boolean('is_delivered').notNullable().defaultTo(false)
      table.boolean('is_canceled').notNullable().defaultTo(false)
      table.integer('total_price').notNullable().defaultTo(0)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
