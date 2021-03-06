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
      throw new Exception(result.message, result.httpCode, result.error.code)
    }

    return this.send(ctx, result.body, result.message, result.httpCode)
  }

  public async show(ctx: HttpContextContract) {
    const result = await this.orderService.fetchOrder(ctx.params.code)

    if (!result.success && result.error) {
      throw new Exception(result.message, result.httpCode, result.error.code)
    }

    return this.send(ctx, result.body, result.message, result.httpCode)
  }

  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(CreateOrderValidator)
    const result = await this.orderService.create(payload)

    if (!result.success && result.error) {
      throw new Exception(result.message, result.httpCode, result.error.code)
    }

    return this.send(ctx, result.body, result.message, result.httpCode)
  }

  public async updateStatus(ctx: HttpContextContract) {
    const result = await this.orderService.updateOrderStatus(ctx.params.code, ctx.params.status)

    console.log(ctx.params)

    if (!result.success && result.error) {
      throw new Exception(result.message, result.httpCode, result.error.code)
    }

    return this.send(ctx, result.body, result.message, result.httpCode)
  }
}

new Ioc().make(OrdersController)
