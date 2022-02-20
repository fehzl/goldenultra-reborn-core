import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { Exception, inject, Ioc } from '@adonisjs/core/build/standalone'
import BaseController from 'App/Controllers/BaseController'
import CreateOrderValidator from 'App/Validators/Order/CreateOrderValidator'
import OrderService from 'App/Services/OrderService'

@inject()
export default class OrdersController extends BaseController {
  private orderService: OrderService

  constructor(orderService: OrderService) {
    super()
    this.orderService = orderService
  }

  public async index(ctx: HttpContextContract) {
    const result = await this.orderService.fetchOrders()

    if (!result.success && result.error) {
      throw new Exception(result.error, result.httpCode)
    }

    return this.send(ctx, result.data, result.message, result.httpCode)
  }

  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(CreateOrderValidator)
    const result = await this.orderService.create(payload)

    if (!result.success && result.error) {
      throw new Exception(result.message, result.error, result.httpCode)
    }

    return this.send(ctx, result.data, result.message, result.httpCode)
  }
}

new Ioc().make(OrdersController)
