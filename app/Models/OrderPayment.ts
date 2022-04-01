import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class OrderPayment extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public orderId: string

  @column()
  public method: string

  @column()
  public situation: string

  @column()
  public value: number

  @column()
  public identifier: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
