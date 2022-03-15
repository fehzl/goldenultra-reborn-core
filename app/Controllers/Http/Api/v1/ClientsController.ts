import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception, inject, Ioc } from '@adonisjs/core/build/standalone'
import BaseController from 'App/Controllers/BaseController'
import ClientService from 'App/Services/ClientService'
import CreateClientValidator from 'App/Validators/Client/CreateClientValidator'

@inject()
export default class ClientsController extends BaseController {
  private clientService: ClientService

  constructor(clientService: ClientService) {
    super()
    this.clientService = clientService
  }

  public async index(ctx: HttpContextContract) {
    const result = await this.clientService.fetchClients(ctx.request.qs())

    if (!result.success && result.error) {
      throw new Exception(result.message, result.httpCode, result.error.code)
    }

    return this.send(ctx, result.body, result.message, result.httpCode, result.meta)
  }

  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(CreateClientValidator)
    const result = await this.clientService.createClient(payload)

    if (!result.success && result.error) {
      throw new Exception(result.message, result.httpCode, result.error.code)
    }

    return this.send(ctx, result.body, result.message, result.httpCode)
  }

  public async delete(ctx: HttpContextContract) {
    const result = await this.clientService.deleteClient(ctx.params.id)

    if (!result.success && result.error) {
      throw new Exception(result.message, result.httpCode, result.error.code)
    }

    return this.send(ctx, result.body, result.message, result.httpCode)
  }
}

new Ioc().make(ClientsController)
