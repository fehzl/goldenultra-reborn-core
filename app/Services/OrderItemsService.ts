import { inject, Ioc } from '@adonisjs/core/build/standalone'
import OrderItemsRepository from 'App/Repositories/OrderItemsRepository'
import CreateOrderItemValidator from 'App/Validators/Order/CreateOrderItemValidator'

@inject()
export default class OrderItemsService {
  private OrderItemRepository: OrderItemsRepository

  constructor(orderItemRepository: OrderItemsRepository) {
    this.OrderItemRepository = orderItemRepository
  }

  public async fetchOrderItems(): Promise<any> {
    const orderItems = await this.OrderItemRepository.getAll()

    return {
      success: true,
      httpCode: 200,
      message: 'Order items fetched successfully',
      data: orderItems,
    }
  }

  public async create(data: CreateOrderItemValidator['schema']['props']): Promise<any> {
    const orderItem = await this.OrderItemRepository.create(data)

    return {
      success: true,
      httpCode: 201,
      message: 'Order item created successfully',
      data: orderItem,
    }
  }
}

new Ioc().make(OrderItemsService)
