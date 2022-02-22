import Device from 'App/Models/Device'
import CreateDeviceValidator from 'App/Validators/Device/CreateDeviceValidator'

export default class DeviceRepository {
  private Device: typeof Device

  constructor() {
    this.Device = Device
  }

  public async getAll(params?: any): Promise<Device[]> {
    const { search, availableToSell, page, limit }: any = params || {}

    const query = this.Device.query()

    if (search) {
      query
        .orWhere('exhibitionDescription', 'ilike', `%${search}%`)
        .orWhere('detailedDescription', 'ilike', `%${search}%`)
        .orWhere('alias', 'ilike', `%${search}%`)
        .orWhere('code', 'ilike', `%${search}%`)
    }

    if (availableToSell) {
      query.andWhere('availableToSell', availableToSell)
    }

    if (limit) {
      return query.limit(limit)
    }

    return query
  }

  public async getById(id: string): Promise<Device | null> {
    return this.Device.find(id)
  }

  public async getByAlias(alias: string): Promise<Device | null> {
    return this.Device.findBy('alias', alias)
  }

  public async create(data: CreateDeviceValidator['schema']['props']): Promise<Device> {
    return this.Device.create(data)
  }
}
