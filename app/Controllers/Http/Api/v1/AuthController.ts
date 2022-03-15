import { inject, Ioc } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@poppinss/utils'
import BaseController from 'App/Controllers/BaseController'
import AuthService from 'App/Services/AuthService'
import AuthValidator from 'App/Validators/Auth/AuthValidator'

@inject()
export default class AuthController extends BaseController {
  private authService: AuthService

  constructor(authService: AuthService) {
    super()
    this.authService = authService
  }

  public async login(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(AuthValidator)
    const result = await this.authService.login(payload.email, payload.password, ctx)

    if (!result.success && result.error) {
      throw new Exception(result.message, result.httpCode, result.error.code)
    }

    return this.send(ctx, result.body, result.message, result.httpCode)
  }

  public async logout(ctx: HttpContextContract) {
    const result = await this.authService.logout(ctx)

    if (!result.success && result.error) {
      throw new Exception(result.message, result.httpCode, result.error.code)
    }

    return this.send(ctx, result.body, result.message, result.httpCode)
  }
}

new Ioc().make(AuthController)
