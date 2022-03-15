import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateOrderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    employeeId: schema.string({}, [rules.exists({ table: 'employees', column: 'id' })]),
    clientId: schema.string({}, [rules.exists({ table: 'clients', column: 'id' })]),
    items: schema.array().members(
      schema.object().members({
        deviceId: schema.string({}, [rules.exists({ table: 'devices', column: 'id' })]),
        devicePrice: schema.number(),
        quantity: schema.number([rules.range(1, 999)]),
        price: schema.number(),
      })
    ),
  })

  public messages = {}
}
