import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Device from './Device'

export default class OrderItem extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: null })
  public orderId: string

  @column({ serializeAs: null })
  public deviceId: string

  @hasOne(() => Device, { localKey: 'deviceId', foreignKey: 'id' })
  public device: HasOne<typeof Device>

  @column()
  public price: number

  @column()
  public amount: number

  @column()
  public discount: number

  @column()
  public overall: number

  @column()
  public amountSeparated: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
