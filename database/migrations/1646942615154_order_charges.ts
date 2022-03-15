import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrderCharges extends BaseSchema {
  protected tableName = 'order_charges'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('order_id').notNullable().references('id').inTable('orders').notNullable()
      table.enum('type', ['TAX_REPLACEMENT', 'FREIGHT', 'OTHER']).notNullable()
      table.float('value', 8, 2).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
