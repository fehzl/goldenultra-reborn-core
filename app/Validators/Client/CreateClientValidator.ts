import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, []),
    email: schema.string({}, [rules.email()]),
    type: schema.enum(['individual', 'company']),
    CNPJ: schema.string.nullableAndOptional({}, []),
    CPF: schema.string({}, []),
    RG: schema.string({}, []),
    IE: schema.string.nullableAndOptional({}, []),
    address: schema.object().members({
      street: schema.string({}, []),
      number: schema.string({}, []),
      complement: schema.string({}, []),
      reference: schema.string({}, []),
      neighborhood: schema.string({}, []),
      city: schema.string({}, []),
      UF: schema.string({}, []),
      CEP: schema.string({}, []),
      type: schema.enum(['home', 'work']),
      isPrimary: schema.boolean(),
    }),
    phone: schema.object().members({
      number: schema.string({}, []),
      type: schema.enum(['mobile', 'home', 'work']),
      isPrimary: schema.boolean(),
    }),
  })

  public messages = {}
}
