import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import OrderItem from './OrderItem'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public code: string

  @column()
  public employeeId: string

  @column()
  public clientId: string

  @column()
  public isPaid: boolean | null

  @column()
  public isDelivered: boolean | null

  @column()
  public isCanceled: boolean | null

  @column()
  public totalPrice: number | null

  @hasMany(() => OrderItem, { foreignKey: 'orderId' })
  public orderItems: HasMany<typeof OrderItem>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
