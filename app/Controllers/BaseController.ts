import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BaseController {
  public send(
    ctx: HttpContextContract,
    body: any,
    message: string,
    httpCode: number = 200,
    meta?: any
  ): void {
    const response = {
      httpCode,
      message,
      body,
      meta,
    }

    return ctx.response.status(httpCode).send(response)
  }
}
