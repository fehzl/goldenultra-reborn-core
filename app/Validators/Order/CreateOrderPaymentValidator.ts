import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateOrderPaymentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    orderId: schema.string({}, [rules.exists({ table: 'orders', column: 'id' })]),
    method: schema.string({}, []),
    situation: schema.string({}, []),
    value: schema.number(),
    identifier: schema.string(),
  })

  public messages = {}
}
