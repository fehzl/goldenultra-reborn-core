import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateOrderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    code: schema.string({}, [rules.unique({ table: 'orders', column: 'code' })]),
    employeeId: schema.string({}, [rules.exists({ table: 'users', column: 'id' })]),
    clientId: schema.string({}, [rules.exists({ table: 'users', column: 'id' })]),
    isPaid: schema.boolean.nullable(),
    isDelivered: schema.boolean.nullable(),
    isCanceled: schema.boolean.nullable(),
    totalPrice: schema.number.nullable(),
    orderItems: schema.array().members(
      schema.object().members({
        deviceId: schema.string({}, [rules.exists({ table: 'devices', column: 'id' })]),
        quantity: schema.number(),
        price: schema.number(),
      })
    ),
  })

  public messages = {}
}
