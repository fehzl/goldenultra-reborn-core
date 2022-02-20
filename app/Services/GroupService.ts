import { inject, Ioc } from '@adonisjs/core/build/standalone'
import GroupRepository from 'App/Repositories/GroupRepository'

@inject()
export default class GroupService {
  private GroupRepository: GroupRepository

  constructor(groupRepository: GroupRepository) {
    this.GroupRepository = groupRepository
  }

  public async fetchGroups(): Promise<any> {
    const groups = await this.GroupRepository.getAll()

    return {
      success: true,
      httpCode: 200,
      message: 'Groups fetched successfully',
      data: groups,
    }
  }

  public async create(data: any): Promise<any> {
    const group = await this.GroupRepository.create(data)

    return {
      success: true,
      httpCode: 201,
      message: 'Group created successfully',
      data: group,
    }
  }
}

new Ioc().make(GroupService)
