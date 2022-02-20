import Device from 'App/Models/Device'
import CreateDeviceValidator from 'App/Validators/Device/CreateDeviceValidator'

export default class DeviceRepository {
  private Device: typeof Device

  constructor() {
    this.Device = Device
  }

  public async getAll(): Promise<Device[]> {
    return this.Device.all()
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
