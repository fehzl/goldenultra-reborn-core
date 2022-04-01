import OrderItem from 'App/Models/OrderItem'
import CreateOrderItemSeparationValidator from 'App/Validators/Order/CreateOrderItemSeparationValidator'
import CreateOrderItemValidator from 'App/Validators/Order/CreateOrderItemValidator'
import { DateTime } from 'luxon'

export default class OrderItemsRepository {
  private OrderItem: typeof OrderItem

  constructor() {
    this.OrderItem = OrderItem
  }

  public async getAll(): Promise<OrderItem[]> {
    return this.OrderItem.all()
  }

  public async getById(id: string): Promise<OrderItem | null> {
    return this.OrderItem.find(id)
  }

  public async getByAlias(alias: string): Promise<OrderItem | null> {
    return this.OrderItem.findBy('alias', alias)
  }

  public async create(data: CreateOrderItemValidator['schema']['props']): Promise<OrderItem> {
    return this.OrderItem.create(data)
  }

  public async separate(
    data: CreateOrderItemSeparationValidator['schema']['props'],
    userId: string
  ): Promise<OrderItem> {
    const orderItem = await this.OrderItem.find(data.id)

    if (!orderItem) {
      throw new Error('Order item not found')
    }

    console.log('aqui', userId)

    orderItem.amountSeparated = orderItem.amount
    orderItem.separated = true
    orderItem.separatedByEmployeeId = userId
    orderItem.separatedAt = DateTime.now()
    await orderItem.save()

    return orderItem
  }
}
