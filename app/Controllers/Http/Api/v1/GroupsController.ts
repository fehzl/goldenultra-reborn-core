import { Exception, inject, Ioc } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import BaseController from 'App/Controllers/BaseController'
import GroupService from 'App/Services/GroupService'
import CreateGroupValidator from 'App/Validators/Group/CreateGroupValidator'

@inject()
export default class GroupsController extends BaseController {
  private groupService: GroupService

  constructor(groupService: GroupService) {
    super()
    this.groupService = groupService
  }

  public async index(ctx: HttpContextContract) {
    const result = await this.groupService.fetchGroups()

    if (!result.success && result.error) {
      throw new Exception(result.message, result.httpCode, result.error.code)
    }

    return this.send(ctx, result.body, result.message, result.httpCode, result.meta)
  }

  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(CreateGroupValidator)
    const result = await this.groupService.create(payload)

    if (!result.success && result.error) {
      throw new Exception(result.message, result.httpCode, result.error.code)
    }

    return this.send(ctx, result.body, result.message, result.httpCode)
  }
}

new Ioc().make(GroupsController)
