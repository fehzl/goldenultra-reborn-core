import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Group extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public alias: string

  @column()
  public name: string

  @column()
  public description: string | null

  @column()
  public color: string | null

  @column()
  public image: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
