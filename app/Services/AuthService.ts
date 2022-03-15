import { inject, Ioc } from '@adonisjs/core/build/standalone'
import UserRepository from 'App/Repositories/UserRepository'
import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import IResponse from 'App/Datatypes/Interfaces/IResponse'

@inject()
export default class AuthService {
  private userRepository: UserRepository
  private authGuard: 'api'
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async login(
    email: string,
    password: string,
    ctx: HttpContextContract
  ): Promise<IResponse> {
    const user = await this.userRepository.getByEmail(email)

    if (!user || !(await Hash.verify(user.password, password))) {
      return {
        success: false,
        httpCode: 401,
        message: 'Invalid email or password',
        body: {},
        error: {
          code: 'invalid_credentials',
        },
      }
    }

    const accessToken = await ctx.auth.use(this.authGuard).generate(user, {
      expiresIn: '30d',
    })

    return {
      success: true,
      httpCode: 200,
      message: 'Login successful',
      body: {
        user: user,
        jwt: accessToken.token,
      },
    }
  }

  public async logout(ctx: HttpContextContract): Promise<IResponse> {
    await ctx.auth.use(this.authGuard).revoke()

    return {
      success: true,
      httpCode: 200,
      message: 'Logout successful',
      body: {},
    }
  }
}

new Ioc().make(AuthService)
