import { inject } from '@adonisjs/core/build/standalone'
import OrderRepository from 'App/Repositories/OrderRepository'
import CreateOrderValidator from 'App/Validators/Order/CreateOrderValidator'

@inject()
export default class OrderService {
  private OrderRepository: OrderRepository

  constructor(orderRepository: OrderRepository) {
    this.OrderRepository = orderRepository
  }

  public async fetchOrders(): Promise<any> {
    const orders = await this.OrderRepository.getAll()

    return {
      success: true,
      httpCode: 200,
      message: 'Orders fetched successfully',
      data: orders,
    }
  }

  public async create(data: CreateOrderValidator['schema']['props']): Promise<any> {
    const order = await this.OrderRepository.create(data)

    return {
      success: true,
      httpCode: 201,
      message: 'Order created successfully',
      data: order,
    }
  }
}
