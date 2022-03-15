import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrderPayments extends BaseSchema {
  protected tableName = 'order_payments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('order_id').references('id').inTable('orders').onDelete('CASCADE')
      table
        .enum('method', [
          'PIX',
          'TED',
          'DOC',
          'TICKET',
          'CREDIT_CARD',
          'DEBIT_CARD',
          'CASH',
          'OTHER',
        ])
        .notNullable()
      table.enum('situation', ['PENDING', 'PAID', 'CANCELED', 'REFUNDED']).notNullable()
      table.float('amount').notNullable()
      table.string('identifier').nullable()
      table.text('observation').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
