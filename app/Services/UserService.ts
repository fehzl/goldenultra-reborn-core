import { inject, Ioc } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UserRepository from 'App/Repositories/UserRepository'
import CreateUserValidator from 'App/Validators/User/CreateUserValidator'

@inject()
export default class UserService {
  private UserRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.UserRepository = userRepository
  }

  public async fetchUsers(): Promise<any> {
    const users = await this.UserRepository.getAll()

    return {
      success: true,
      httpCode: 200,
      message: 'Users fetched successfully',
      data: users,
    }
  }

  public async createUser(data: CreateUserValidator['schema']['props']): Promise<any> {
    const user = await this.UserRepository.create(data)

    return {
      success: true,
      httpCode: 201,
      message: 'User created successfully',
      data: user,
    }
  }
}

new Ioc().make(UserService)
