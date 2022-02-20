import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateOrderItemValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    orderId: schema.string({}, [rules.exists({ table: 'orders', column: 'id' })]),
    deviceId: schema.string({}, [rules.exists({ table: 'devices', column: 'id' })]),
    quantity: schema.number(),
    price: schema.number(),
  })

  public messages = {}
}
