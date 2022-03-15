import { inject, Ioc } from '@adonisjs/core/build/standalone'
import IResponse from 'App/Datatypes/Interfaces/IResponse'
import DeviceRepository from 'App/Repositories/DeviceRepository'
import CreateDeviceValidator from 'App/Validators/Device/CreateDeviceValidator'

@inject()
export default class DeviceService {
  private DeviceRepository: DeviceRepository

  constructor(deviceRepository: DeviceRepository) {
    this.DeviceRepository = deviceRepository
  }

  public async fetchDevices(params?: any): Promise<IResponse> {
    const devices = await this.DeviceRepository.getAll(params)

    return {
      success: true,
      httpCode: 200,
      message: 'Devices fetched successfully',
      body: devices,
    }
  }

  public async fetchDeviceById(id: string): Promise<IResponse> {
    const device = await this.DeviceRepository.getById(id)

    if (!device) {
      return {
        success: false,
        httpCode: 404,
        message: 'Device not found',
        body: {},
        error: {
          code: 'DEVICE_NOT_FOUND',
        },
      }
    }

    return {
      success: true,
      httpCode: 200,
      message: 'Device fetched successfully',
      body: device,
    }
  }

  public async fetchDeviceByAlias(alias: string): Promise<IResponse> {
    const device = await this.DeviceRepository.getByAlias(alias)

    if (!device) {
      return {
        success: false,
        httpCode: 404,
        message: 'Device not found',
        body: {},
        error: {
          code: 'DEVICE_NOT_FOUND',
        },
      }
    }

    return {
      success: true,
      httpCode: 200,
      message: 'Device fetched successfully',
      body: device,
    }
  }

  public async create(data: CreateDeviceValidator['schema']['props']): Promise<IResponse> {
    const device = await this.DeviceRepository.create(data)

    if (!device) {
      return {
        success: false,
        httpCode: 400,
        message: 'Device creation failed',
        body: {},
        error: {
          code: 'DEVICE_CREATION_FAILED',
        },
      }
    }

    return {
      success: true,
      httpCode: 201,
      message: 'Device created successfully',
      body: device,
    }
  }
}

new Ioc().make(DeviceService)
