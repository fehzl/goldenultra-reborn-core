import { inject, Ioc } from '@adonisjs/core/build/standalone'
import IResponse from 'App/Datatypes/Interfaces/IResponse'
import OrderItemsRepository from 'App/Repositories/OrderItemsRepository'
import CreateOrderItemSeparationValidator from 'App/Validators/Order/CreateOrderItemSeparationValidator'
import CreateOrderItemValidator from 'App/Validators/Order/CreateOrderItemValidator'

@inject()
export default class OrderItemsService {
  private OrderItemRepository: OrderItemsRepository

  constructor(orderItemRepository: OrderItemsRepository) {
    this.OrderItemRepository = orderItemRepository
  }

  public async fetchOrderItems(): Promise<IResponse> {
    const orderItems = await this.OrderItemRepository.getAll()

    return {
      success: true,
      httpCode: 200,
      message: 'Order items fetched successfully',
      body: orderItems,
    }
  }

  public async create(data: CreateOrderItemValidator['schema']['props']): Promise<IResponse> {
    const orderItem = await this.OrderItemRepository.create(data)

    return {
      success: true,
      httpCode: 201,
      message: 'Order item created successfully',
      body: orderItem,
    }
  }

  public async separate(
    data: CreateOrderItemSeparationValidator['schema']['props'],
    userId: string
  ): Promise<IResponse> {
    const orderItem = await this.OrderItemRepository.separate(data, userId)

    return {
      success: true,
      httpCode: 200,
      message: 'Order item separated successfully',
      body: orderItem,
    }
  }
}

new Ioc().make(OrderItemsService)
