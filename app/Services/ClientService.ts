import { inject, Ioc } from '@adonisjs/core/build/standalone'
import IResponse from 'App/Datatypes/Interfaces/IResponse'
import ClientRepository from 'App/Repositories/ClientRepository'
import CreateClientValidator from 'App/Validators/Client/CreateClientValidator'

@inject()
export default class ClientService {
  private ClientRepository: ClientRepository

  constructor(clientRepository: ClientRepository) {
    this.ClientRepository = clientRepository
  }

  public async fetchClients(params?: any): Promise<IResponse> {
    const clients = await this.ClientRepository.getAll(params)

    return {
      success: true,
      httpCode: 200,
      message: 'Clients fetched successfully',
      body: clients,
    }
  }

  public async fetchClient(id: string): Promise<IResponse> {
    const client = await this.ClientRepository.find(id)

    if (!client) {
      return {
        success: false,
        httpCode: 404,
        message: 'Client not found',
        body: {},
      }
    }

    return {
      success: true,
      httpCode: 200,
      message: 'Client fetched successfully',
      body: client,
    }
  }

  public async createClient(data: CreateClientValidator['schema']['props']): Promise<IResponse> {
    const client = await this.ClientRepository.create(data)

    return {
      success: true,
      httpCode: 201,
      message: 'Client created successfully',
      body: client,
    }
  }

  public async deleteClient(id: number): Promise<IResponse> {
    try {
      await this.ClientRepository.delete(id)

      return {
        success: true,
        httpCode: 200,
        message: 'Client deleted successfully',
        body: {},
      }
    } catch (e) {
      return {
        success: false,
        httpCode: 500,
        message: 'Error deleting client',
        body: {},
      }
    }
  }
}
new Ioc().make(ClientService)
