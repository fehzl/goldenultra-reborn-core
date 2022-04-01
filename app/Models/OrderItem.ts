import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Device from './Device'
import User from './User'
import Employee from './Employee'

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
  public separated: boolean

  @column()
  public amountSeparated: number

  @column()
  public separatedByEmployeeId: string

  @belongsTo(() => Employee, {
    localKey: 'id',
    foreignKey: 'separatedByEmployeeId',
  })
  public separated_by: BelongsTo<typeof Employee>

  @column.dateTime({ autoCreate: false })
  public separatedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
