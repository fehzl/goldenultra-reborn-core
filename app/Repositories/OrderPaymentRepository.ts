import Order from 'App/Models/Order'
import OrderPayment from 'App/Models/OrderPayment'
import CreateOrderPaymentValidator from 'App/Validators/Order/CreateOrderPaymentValidator'

export default class OrderPaymentRepository {
  private Order: typeof Order
  private OrderPayment: typeof OrderPayment

  constructor() {
    this.Order = Order
    this.OrderPayment = OrderPayment
  }

  public async getAll(): Promise<OrderPayment[]> {
    return this.OrderPayment.all()
  }

  public async create(data: CreateOrderPaymentValidator['schema']['props']): Promise<OrderPayment> {
    const orderPayment = await this.OrderPayment.create(data)
    const order = await this.Order.query()
      .where('id', data.orderId)
      .preload('payments')
      .preload('items')
      .first()

    if (order) {
      const getPaymentsTotal = order.payments.reduce((acc, cur) => acc + cur.amount, 0)
      const getItemsTotal = order.items.reduce((acc, cur) => acc + cur.overall, 0)

      if (getPaymentsTotal >= getItemsTotal) {
        order.situation = 'PAID'
      } else {
        order.situation = 'PAID_PARTIAL'
      }

      await order.save()
    }

    return orderPayment
  }
}
