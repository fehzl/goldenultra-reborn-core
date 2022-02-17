import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.maxLength(128),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [rules.minLength(6), rules.maxLength(128)]),
  })

  public messages = {
    'email.required': 'E-mail é obrigatório',
    'email.email': 'E-mail inválido',
    'email.maxLength': 'E-mail deve ter no máximo 128 caracteres',
    'email.unique': 'E-mail já cadastrado',

    'password.required': 'Senha é obrigatória',
    'password.minLength': 'Senha deve ter no mínimo 6 caracteres',
    'password.maxLength': 'Senha deve ter no máximo 128 caracteres',
  }
}
