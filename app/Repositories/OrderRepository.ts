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
    return this.Order.query()
      .preload('client')
      .preload('employee')
      .preload('items')
      .preload('payments')
      .preload('charges')
  }

  public async getById(id: string): Promise<Order | null> {
    return this.Order.find(id)
  }

  public async getByCode(code: string): Promise<Order | null> {
    return this.Order.query()
      .where('code', code)
      .preload('client')
      .preload('employee')
      .preload('items')
      .preload('payments')
      .preload('charges')
      .first()
  }

  public async create(data: CreateOrderValidator['schema']['props']): Promise<Order> {
    // code = GT-{ddmmyyyy}-{hhmmss} to localeString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    const date = `${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`

    // fomart date to DDMMYYYY-HHMMSS
    const code = date
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{2})$/, '$1$2$3-$4$5$6')

    console.log(code)

    const order = await this.Order.create({
      code: `GT-${code}`,
      employeeId: data.employeeId,
      clientId: data.clientId,
    })
    for (const items of data.items) {
      await this.OrderItem.create({
        orderId: order.id,
        deviceId: items.deviceId,
        devicePrice: items.devicePrice,
        quantity: items.quantity,
        price: items.price,
      })
    }

    return order
  }

  public async updateSituation(code: string, situation: any): Promise<Order | null> {
    const order = await this.getByCode(code)

    if (!order) {
      return null
    }

    order.situation = situation

    await order.save()

    return order
  }
}
