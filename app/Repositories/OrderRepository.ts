import Order from 'App/Models/Order'
import OrderItem from 'App/Models/OrderItem'
import CreateOrderValidator from 'App/Validators/Order/CreateOrderValidator'

export default class OrderRepository {
  private Order: typeof Order
  private OrderItem: typeof OrderItem

  constructor() {
    this.Order = Order
    this.OrderItem = OrderItem
  }

  public async getAll(): Promise<Order[]> {
    return this.Order.query().preload('orderItems')
  }

  public async getById(id: string): Promise<Order | null> {
    return this.Order.find(id)
  }

  public async getByAlias(alias: string): Promise<Order | null> {
    return this.Order.findBy('alias', alias)
  }

  public async create(data: CreateOrderValidator['schema']['props']): Promise<Order> {
    const order = await this.Order.create({
      code: data.code,
      employeeId: data.employeeId,
      clientId: data.clientId,
      isPaid: data.isPaid,
      isDelivered: data.isDelivered,
      isCanceled: data.isCanceled,
      totalPrice: data.totalPrice,
    })
    for (const orderItem of data.orderItems) {
      await this.OrderItem.create({
        orderId: order.id,
        deviceId: orderItem.deviceId,
        quantity: orderItem.quantity,
        price: orderItem.price,
      })
    }

    return order
  }
}
