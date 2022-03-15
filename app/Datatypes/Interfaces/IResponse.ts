/* eslint-disable @typescript-eslint/naming-convention */

export default interface IResponse<T = {}> {
  success: boolean
  httpCode: number
  body: T | {}
  message: string
  meta?: {
    pagination?: any
  }
  error?: {
    code: string
  }
}
