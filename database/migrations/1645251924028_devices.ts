import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Devices extends BaseSchema {
  protected tableName = 'devices'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.string('alias').notNullable().unique()
      table.string('code').notNullable().unique()
      table.integer('un_in_a_box').notNullable()
      table.float('net_weight').notNullable()
      table.float('gross_weight').notNullable()
      table.string('exhibition_description').nullable()
      table.text('detailed_description').nullable()
      table.string('images').nullable()
      table.boolean('available_to_sell').notNullable()
      table.float('un_price').notNullable()
      table.float('box_price').notNullable()
      table.integer('un_avaliable_to_sell').notNullable()
      table.uuid('group_id').notNullable().references('id').inTable('groups').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
