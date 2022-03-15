import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateOrderChargeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    order_id: schema.string({}, [rules.exists({ table: 'orders', column: 'id' })]),
    type: schema.string({}, []),
    value: schema.number(),
  })

  public messages = {}
}
