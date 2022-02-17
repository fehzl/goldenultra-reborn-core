import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception, inject, Ioc } from '@adonisjs/core/build/standalone'
import CreateUserValidator from 'App/Validators/User/CreateUserValidator'
import UserService from 'App/Services/UserService'
import BaseController from 'App/Controllers/BaseController'

@inject()
export default class UsersController extends BaseController {
  private userService: UserService

  constructor(userService: UserService) {
    super()
    this.userService = userService
  }

  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(CreateUserValidator)
    const result = await this.userService.createUser(payload)

    if (!result.success && result.error) {
      throw new Exception(result.message, result.error, result.httpCode)
    }

    return this.send(ctx, result.data, result.message, result.httpCode)
  }
}

new Ioc().make(UsersController)
