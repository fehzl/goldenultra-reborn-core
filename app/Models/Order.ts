import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  computed,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import OrderItem from './OrderItem'
import Client from './Client'
import OrderPayment from './OrderPayment'
import Employee from './Employee'
import OrderCharge from './OrderCharge'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public code: string

  @column({ serializeAs: null })
  public employeeId: string

  @hasOne(() => Employee, {
    foreignKey: 'id',
    localKey: 'employeeId',
    onQuery: (query) => query.select('id', 'name'),
  })
  public employee: HasOne<typeof Employee>

  @column({ serializeAs: null })
  public clientId: string

  @hasOne(() => Client, {
    foreignKey: 'id',
    localKey: 'clientId',
    onQuery: (query) =>
      query
        .select('id', 'name', 'email', 'type', 'CNPJ', 'CPF', 'RG', 'IE')
        .preload('address', (query) =>
          query.select(
            'id',
            'street',
            'number',
            'complement',
            'reference',
            'neighborhood',
            'city',
            'UF',
            'CEP',
            'type'
          )
        )
        .preload('phone', (query) => query.select('id', 'number', 'type')),
  })
  public client: HasOne<typeof Client>

  @column()
  public situation: 'PENDING' | 'PAID_PARTIAL' | 'PAID' | 'SEPARATED' | 'DELIVERED'

  @hasMany(() => OrderItem, {
    foreignKey: 'orderId',
    onQuery: (query) =>
      query
        .select('id', 'deviceId', 'price', 'amount', 'discount', 'overall', 'amountSeparated')
        .preload('device', (deviceQuery) =>
          deviceQuery.select('id', 'alias', 'code', 'exhibition_description', 'un_price')
        ),
  })
  public items: HasMany<typeof OrderItem>

  @hasMany(() => OrderPayment, {
    foreignKey: 'orderId',
    onQuery: (query) =>
      query.select(
        'id',
        'method',
        'amount',
        'identifier',
        'situation',
        'observation',
        'created_at'
      ),
  })
  public payments: HasMany<typeof OrderPayment>

  @hasMany(() => OrderCharge, {
    foreignKey: 'orderId',
    onQuery: (query) => query.select('id', 'type', 'value', 'created_at'),
  })
  public charges: HasMany<typeof OrderCharge>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @computed()
  public get items_price_sum(): number {
    return this.items.reduce((sum, item) => sum + item.overall, 0)
  }

  @computed()
  public get items_discount_sum(): number {
    return this.items.reduce((sum, item) => sum + item.discount, 0)
  }

  @computed()
  public get charges_sum(): number {
    return this.charges.reduce((sum, charge) => sum + charge.value, 0)
  }

  @computed()
  public get order_price_overall(): number {
    return this.items_price_sum - this.items_discount_sum + this.charges_sum
  }

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
