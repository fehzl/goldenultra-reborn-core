import Group from 'App/Models/Group'
import CreateGroupValidator from 'App/Validators/Group/CreateGroupValidator'

export default class GroupRepository {
  private Group: typeof Group

  constructor() {
    this.Group = Group
  }

  public async getAll(): Promise<Group[]> {
    return this.Group.query().orderBy('name', 'asc')
  }

  public async getById(id: string): Promise<Group | null> {
    return this.Group.find(id)
  }

  public async getByAlias(alias: string): Promise<Group | null> {
    return this.Group.findBy('alias', alias)
  }

  public async create(data: CreateGroupValidator['schema']['props']): Promise<Group> {
    return this.Group.create(data)
  }
}
