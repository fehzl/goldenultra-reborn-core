import { inject, Ioc } from '@adonisjs/core/build/standalone'
import IResponse from 'App/Datatypes/Interfaces/IResponse'
import OrderRepository from 'App/Repositories/OrderRepository'
import CreateOrderValidator from 'App/Validators/Order/CreateOrderValidator'

@inject()
export default class OrderService {
  private OrderRepository: OrderRepository

  constructor(orderRepository: OrderRepository) {
    this.OrderRepository = orderRepository
  }

  public async fetchOrders(): Promise<IResponse> {
    const orders = await this.OrderRepository.getAll()

    return {
      success: true,
      httpCode: 200,
      message: 'Orders fetched successfully',
      body: orders,
    }
  }

  public async fetchOrder(code: string): Promise<IResponse> {
    const order = await this.OrderRepository.getByCode(code)

    if (!order) {
      return {
        success: false,
        httpCode: 404,
        message: 'Order not found',
        body: {},
        error: {
          code: 'ORDER_NOT_FOUND',
        },
      }
    }

    return {
      success: true,
      httpCode: 200,
      message: 'Order fetched successfully',
      body: order,
    }
  }

  public async create(data: CreateOrderValidator['schema']['props']): Promise<IResponse> {
    const order = await this.OrderRepository.create(data)

    return {
      success: true,
      httpCode: 201,
      message: 'Order created successfully',
      body: order,
    }
  }

  public async updateOrderStatus(code: string, status: string): Promise<IResponse> {
    const order = await this.OrderRepository.getByCode(code)

    if (!order) {
      return {
        success: false,
        httpCode: 404,
        message: 'Order not found',
        body: {},
        error: {
          code: 'ORDER_NOT_FOUND',
        },
      }
    }

    await this.OrderRepository.updateSituation(code, status)

    return {
      success: true,
      httpCode: 200,
      message: 'Order updated successfully',
      body: {},
    }
  }
}

new Ioc().make(OrderService)
