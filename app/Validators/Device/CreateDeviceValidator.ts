import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateDeviceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    alias: schema.string({}, [rules.unique({ table: 'devices', column: 'alias' })]),
    code: schema.string({}, [rules.unique({ table: 'devices', column: 'code' })]),
    unInABox: schema.number(),
    netWeight: schema.number(),
    grossWeight: schema.number(),
    exhibitionDescription: schema.string.nullable(),
    detailedDescription: schema.string.nullable(),
    images: schema.string.nullable(),
    availableToSell: schema.boolean(),
    unPrice: schema.number(),
    boxPrice: schema.number(),
    unAvaliableToSell: schema.number(),
    groupId: schema.string({}, [rules.exists({ table: 'groups', column: 'id' })]),
  })

  public messages = {}
}
