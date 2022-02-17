import { inject, Ioc } from '@adonisjs/core/build/standalone'

@inject()
export default class UserService {}

new Ioc().make(UserService)
