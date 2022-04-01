import { Exception, inject, Ioc } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from 'App/Controllers/BaseController'
import EmployeeRepository from 'App/Repositories/EmployeeRepository'
import EmployeeService from 'App/Services/EmployeeService'
import OrderItemsService from 'App/Services/OrderItemsService'
import CreateOrderItemSeparationValidator from 'App/Validators/Order/CreateOrderItemSeparationValidator'

@inject()
export default class OrdersSeparationsController extends BaseController {
  private orderItemService: OrderItemsService
  private employeeRepository: EmployeeRepository

  constructor(orderItemService: OrderItemsService, employeeRepository: EmployeeRepository) {
    super()
    this.orderItemService = orderItemService
    this.employeeRepository = employeeRepository
  }

  public async update(ctx: HttpContextContract) {
    const user = await ctx.auth.use('api').authenticate()
    const employee = await this.employeeRepository.getByUserId(user.id)

    console.log(employee)
    const payload = await ctx.request.validate(CreateOrderItemSeparationValidator)
    const result = await this.orderItemService.separate(payload, employee.id)

    if (!result.success && result.error) {
      throw new Exception(result.message, result.httpCode, result.error.code)
    }

    return this.send(ctx, result.body, result.message, result.httpCode)
  }
}

new Ioc().make(OrdersSeparationsController)
