import Client from 'App/Models/Client'
import ClientAddress from 'App/Models/ClientAddress'
import ClientPhone from 'App/Models/ClientPhone'
import CreateClientValidator from 'App/Validators/Client/CreateClientValidator'

export default class ClientRepository {
  private Client: typeof Client
  private ClientAddress: typeof ClientAddress
  private ClientPhone: typeof ClientPhone

  constructor() {
    this.Client = Client
    this.ClientAddress = ClientAddress
    this.ClientPhone = ClientPhone
  }

  public async getAll(params: any): Promise<Client[]> {
    const { search }: any = params || {}

    const query = this.Client.query().preload('address').preload('phone')

    if (search) {
      query.where('name', 'ilike', `%${search}%`)
    }

    return query
  }

  public async findByCPF(cpf: string): Promise<Client | null> {
    return await this.Client.query().where('cpf', cpf).first()
  }

  public async findByCNPJ(cnpj: string): Promise<Client | null> {
    return await this.Client.query().where('cnpj', cnpj).first()
  }

  public async create(data: CreateClientValidator['schema']['props']): Promise<Client> {
    const client = await this.Client.create({
      name: data.name,
      email: data.email,
      type: data.type,
      CNPJ: data.CNPJ,
      CPF: data.CPF,
      RG: data.RG,
      IE: data.IE,
    })

    if (data.address) {
      await this.ClientAddress.create({
        clientId: client.id,
        street: data.address.street,
        number: data.address.number,
        complement: data.address.complement,
        reference: data.address.reference,
        neighborhood: data.address.neighborhood,
        city: data.address.city,
        UF: data.address.UF,
        CEP: data.address.CEP,
        type: data.address.type,
        isPrimary: data.address.isPrimary,
      })
    }

    if (data.phone) {
      await this.ClientPhone.create({
        clientId: client.id,
        number: data.phone.number,
        type: data.phone.type,
      })
    }

    return client
  }

  public async delete(id: number): Promise<void> {
    return await (await this.Client.findOrFail(id)).delete()
  }
}
