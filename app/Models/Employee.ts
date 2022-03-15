import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string

  @hasOne(() => User)
  public user: HasOne<typeof User>

  @column()
  public name: string

  @column()
  public email: string

  @column({ columnName: 'CPF' })
  public CPF: string

  @column({ columnName: 'RG' })
  public RG: string

  @column({ columnName: 'CTPS' })
  public CTPS: string

  @column()
  public role: string

  @column()
  public birth: DateTime

  @column()
  public admission: DateTime

  @column()
  public dismissal: DateTime | null

  @column()
  public canLogin: boolean

  @column()
  public isEnabled: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
