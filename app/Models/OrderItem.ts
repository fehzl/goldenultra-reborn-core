import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'

export default class OrderItem extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public orderId: string

  @belongsTo(() => Order, { foreignKey: 'orderId' })
  public order: BelongsTo<typeof Order>

  @column()
  public deviceId: string

  @hasOne(() => OrderItem, { foreignKey: 'orderId' })
  public orderItems: HasOne<typeof OrderItem>

  @column()
  public quantity: number

  @column()
  public price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
