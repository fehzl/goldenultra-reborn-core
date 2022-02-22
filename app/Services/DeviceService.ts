import { inject, Ioc } from '@adonisjs/core/build/standalone'
import DeviceRepository from 'App/Repositories/DeviceRepository'
import CreateDeviceValidator from 'App/Validators/Device/CreateDeviceValidator'

@inject()
export default class DeviceService {
  private DeviceRepository: DeviceRepository

  constructor(deviceRepository: DeviceRepository) {
    this.DeviceRepository = deviceRepository
  }

  public async fetchDevices(params?: any): Promise<any> {
    const devices = await this.DeviceRepository.getAll(params)

    return {
      success: true,
      httpCode: 200,
      message: 'Devices fetched successfully',
      data: devices,
    }
  }

  public async fetchDeviceById(id: string): Promise<any> {
    const device = await this.DeviceRepository.getById(id)

    return {
      success: true,
      httpCode: 200,
      message: 'Device fetched successfully',
      data: device,
    }
  }

  public async fetchDeviceByAlias(alias: string): Promise<any> {
    const device = await this.DeviceRepository.getByAlias(alias)

    return {
      success: true,
      httpCode: 200,
      message: 'Device fetched successfully',
      data: device,
    }
  }

  public async create(data: CreateDeviceValidator['schema']['props']): Promise<any> {
    const device = await this.DeviceRepository.create(data)

    return {
      success: true,
      httpCode: 201,
      message: 'Device created successfully',
      data: device,
    }
  }
}

new Ioc().make(DeviceService)
