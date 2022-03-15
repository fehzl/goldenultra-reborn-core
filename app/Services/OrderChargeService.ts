import { inject, Ioc } from '@adonisjs/core/build/standalone'
import IResponse from 'App/Datatypes/Interfaces/IResponse'
import OrderChargeRepository from 'App/Repositories/OrderChargeRepository'
import CreateOrderChargeValidator from 'App/Validators/Order/CreateOrderChargeValidator'

@inject()
export default class OrderChargeService {
  private orderChargeRepository: OrderChargeRepository

  constructor(orderChargeRepository: OrderChargeRepository) {
    this.orderChargeRepository = orderChargeRepository
  }

  public async create(data: CreateOrderChargeValidator['schema']['props']): Promise<IResponse> {
    const orderCharge = await this.orderChargeRepository.create(data)

    return {
      success: true,
      httpCode: 201,
      message: 'Order created successfully',
      body: orderCharge,
    }
  }

  public async delete(id: number): Promise<IResponse> {
    try {
      await this.orderChargeRepository.delete(id)
      return {
        success: true,
        httpCode: 200,
        message: 'Order deleted successfully',
        body: {},
      }
    } catch (e) {
      return {
        success: false,
        httpCode: 404,
        message: 'Order not found',
        body: {},
      }
    }
  }
}

new Ioc().make(OrderChargeService)
