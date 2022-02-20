import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateGroupValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    alias: schema.string({}, [rules.unique({ table: 'groups', column: 'alias' })]),
    name: schema.string(),
    description: schema.string.nullable(),
    color: schema.string.nullable(),
    image: schema.string.nullable(),
  })

  public messages = {}
}
