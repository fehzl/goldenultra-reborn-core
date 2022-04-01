import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { inject, Ioc } from '@adonisjs/core/build/standalone'
import BaseController from 'App/Controllers/BaseController'
import OrderPaymentService from 'App/Services/OrderPaymentService'
import CreateOrderPaymentValidator from 'App/Validators/Order/CreateOrderPaymentValidator'
import { Exception } from '@poppinss/utils'

@inject()
export default class OrdersPaymentsController extends BaseController {
  private orderPaymentService: OrderPaymentService

  constructor(orderPaymentService: OrderPaymentService) {
    super()
    this.orderPaymentService = orderPaymentService
  }

  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(CreateOrderPaymentValidator)
    const result = await this.orderPaymentService.create(payload)

    if (!result.success && result.error) {
      throw new Exception(result.message, result.httpCode, result.error.code)
    }

    return this.send(ctx, result.body, result.message, result.httpCode)
  }

  public async delete(ctx: HttpContextContract) {
    const result = await this.orderPaymentService.delete(ctx.params.id)

    if (!result.success && result.error) {
      throw new Exception(result.message, result.httpCode, result.error.code)
    }

    return this.send(ctx, result.body, result.message, result.httpCode)
  }
}

new Ioc().make(OrdersPaymentsController)
