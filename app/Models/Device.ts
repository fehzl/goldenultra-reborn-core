import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Group from './Group'

export default class Device extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public alias: string

  @column()
  public code: string

  @column()
  public unInABox: number

  @column()
  public netWeight: number

  @column()
  public grossWeight: number

  @column()
  public exhibitionDescription: string | null

  @column()
  public detailedDescription: string | null

  @column()
  public images: string | null

  @column()
  public availableToSell: boolean

  @column()
  public unPrice: number

  @column()
  public boxPrice: number

  @column()
  public unAvaliableToSell: number

  @column()
  public groupId: string

  @belongsTo(() => Group)
  public group: BelongsTo<typeof Group>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
