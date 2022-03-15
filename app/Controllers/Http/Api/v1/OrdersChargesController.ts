import { Exception, inject, Ioc } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from 'App/Controllers/BaseController'
import OrderChargeService from 'App/Services/OrderChargeService'
import CreateOrderChargeValidator from 'App/Validators/Order/CreateOrderChargeValidator'

@inject()
export default class OrdersChargesController extends BaseController {
  private orderChargeService: OrderChargeService

  constructor(orderChargeService: OrderChargeService) {
    super()
    this.orderChargeService = orderChargeService
  }

  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(CreateOrderChargeValidator)
    const result = await this.orderChargeService.create(payload)

    if (!result.success && result.error) {
      throw new Exception(result.message, result.httpCode, result.error.code)
    }

    return this.send(ctx, result.body, result.message, result.httpCode)
  }

  public async delete(ctx: HttpContextContract) {
    const result = await this.orderChargeService.delete(ctx.params.id)

    if (!result.success && result.error) {
      throw new Exception(result.message, result.httpCode, result.error.code)
    }

    return this.send(ctx, result.body, result.message, result.httpCode)
  }
}

new Ioc().make(OrdersChargesController)
