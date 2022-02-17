import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/User/CreateUserValidator'

export default class UserRepository {
  private User: typeof User

  constructor() {
    this.User = User
  }

  public async getAll(): Promise<User[]> {
    return this.User.all()
  }

  public async getById(id: string): Promise<User | null> {
    return this.User.find(id)
  }

  public async create(data: CreateUserValidator['schema']['props']): Promise<User> {
    return this.User.create(data)
  }
}
