import { inject, Ioc } from '@adonisjs/core/build/standalone'
import IResponse from 'App/Datatypes/Interfaces/IResponse'
import GroupRepository from 'App/Repositories/GroupRepository'

@inject()
export default class GroupService {
  private GroupRepository: GroupRepository

  constructor(groupRepository: GroupRepository) {
    this.GroupRepository = groupRepository
  }

  public async fetchGroups(): Promise<IResponse> {
    const groups = await this.GroupRepository.getAll()

    return {
      success: true,
      httpCode: 200,
      message: 'Groups fetched successfully',
      body: groups,
    }
  }

  public async create(data: any): Promise<IResponse> {
    const group = await this.GroupRepository.create(data)

    return {
      success: true,
      httpCode: 201,
      message: 'Group created successfully',
      body: group,
    }
  }
}

new Ioc().make(GroupService)
