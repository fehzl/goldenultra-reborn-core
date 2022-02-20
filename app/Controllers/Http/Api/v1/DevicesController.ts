import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { Exception, inject, Ioc } from '@adonisjs/core/build/standalone'
import BaseController from 'App/Controllers/BaseController'
import DeviceService from 'App/Services/DeviceService'
import CreateDeviceValidator from 'App/Validators/Device/CreateDeviceValidator'

@inject()
export default class DevicesController extends BaseController {
  private deviceService: DeviceService

  constructor(deviceService: DeviceService) {
    super()
    this.deviceService = deviceService
  }

  public async index(ctx: HttpContextContract) {
    const result = await this.deviceService.fetchDevices()

    if (!result.success && result.error) {
      throw new Exception(result.message, result.httpCode, result.error.code)
    }

    return this.send(ctx, result.data, result.message, result.httpCode, result.meta)
  }

  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(CreateDeviceValidator)
    const result = await this.deviceService.create(payload)

    if (!result.success && result.error) {
      throw new Exception(result.message, result.error, result.httpCode)
    }

    return this.send(ctx, result.data, result.message, result.httpCode)
  }
}

new Ioc().make(DevicesController)
