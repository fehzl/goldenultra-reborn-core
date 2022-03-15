import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import ClientAddress from './ClientAddress'
import ClientPhone from './ClientPhone'

export default class Client extends BaseModel {
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

  @column()
  public type: string

  @column({ columnName: 'CPF' })
  public CPF: string | null

  @column({ columnName: 'CNPJ' })
  public CNPJ: string | null

  @column({ columnName: 'RG' })
  public RG: string | null

  @column({ columnName: 'IE' })
  public IE: string | null

  @column()
  public isEnabled: boolean

  @hasOne(() => ClientAddress)
  public address: HasOne<typeof ClientAddress>

  @hasOne(() => ClientPhone)
  public phone: HasOne<typeof ClientPhone>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
