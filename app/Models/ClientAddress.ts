import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ClientAddress extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public clientId: string

  @column()
  public street: string

  @column()
  public number: string

  @column()
  public complement: string

  @column()
  public reference: string

  @column()
  public neighborhood: string

  @column()
  public city: string

  @column({ columnName: 'UF' })
  public UF: string

  @column({ columnName: 'CEP' })
  public CEP: string

  @column()
  public type: string

  @column()
  public isPrimary: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
