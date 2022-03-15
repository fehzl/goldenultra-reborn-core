import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ClientPhone extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public clientId: string

  @column()
  public number: string

  @column()
  public type: string

  @column()
  public isPrimary: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
