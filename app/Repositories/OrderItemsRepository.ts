import OrderItem from 'App/Models/OrderItem'
import CreateOrderItemValidator from 'App/Validators/Order/CreateOrderItemValidator'

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
}
