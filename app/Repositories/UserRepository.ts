import User from 'App/Models/User'

export default class UserRepository {
  private User: typeof User

  constructor() {
    this.User = User
  }

  public async getById(id: string): Promise<User | null> {
    return await this.User.find(id)
  }
}
