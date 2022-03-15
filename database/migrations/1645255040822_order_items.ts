import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrderItems extends BaseSchema {
  protected tableName = 'order_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('order_id').notNullable().references('id').inTable('orders')
      table.uuid('device_id').notNullable().references('id').inTable('devices')
      table.integer('amount').notNullable()
      table.float('price', 8, 2).notNullable()
      table.float('discount', 8, 2).notNullable().defaultTo(0)
      table.float('overall', 8, 2).notNullable()
      table.integer('amount_separated').defaultTo(0)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
