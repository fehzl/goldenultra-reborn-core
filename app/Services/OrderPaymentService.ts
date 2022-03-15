import { inject, Ioc } from '@adonisjs/core/build/standalone'
import CreateOrderPaymentValidator from 'App/Validators/Order/CreateOrderPaymentValidator'
import OrderPaymentRepository from 'App/Repositories/OrderPaymentRepository'
import IResponse from 'App/Datatypes/Interfaces/IResponse'

@inject()
export default class OrderPaymentService {
  private orderPaymentRepository: OrderPaymentRepository

  constructor(orderPaymentRepository: OrderPaymentRepository) {
    this.orderPaymentRepository = orderPaymentRepository
  }

  public async create(data: CreateOrderPaymentValidator['schema']['props']): Promise<IResponse> {
    const orderPayment = await this.orderPaymentRepository.create(data)

    return {
      success: true,
      httpCode: 201,
      message: 'Order created successfully',
      body: orderPayment,
    }
  }
}

new Ioc().make(OrderPaymentService)
