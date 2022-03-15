import Order from 'App/Models/Order'
import OrderCharge from 'App/Models/OrderCharge'
import CreateOrderChargeValidator from 'App/Validators/Order/CreateOrderChargeValidator'

export default class OrderChageRepository {
  private OrderCharge: typeof OrderCharge

  constructor() {
    this.OrderCharge = OrderCharge
  }

  public async create(data: CreateOrderChargeValidator['schema']['props']) {
    return this.OrderCharge.create(data)
  }

  public async delete(id: number) {
    const orderCharge = await this.OrderCharge.find(id)

    orderCharge?.delete()
  }
}
