import { inject, Ioc } from '@adonisjs/core/build/standalone'
import IResponse from 'App/Datatypes/Interfaces/IResponse'
import EmployeeRepository from 'App/Repositories/EmployeeRepository'

@inject()
export default class EmployeeService {
  private EmployeeRepository: EmployeeRepository

  constructor(employeeRepository: EmployeeRepository) {
    this.EmployeeRepository = employeeRepository
  }

  public async getByUserId(userId: string): Promise<IResponse> {
    const employee = await this.EmployeeRepository.getByUserId(userId)

    if (!employee) {
      return {
        success: false,
        httpCode: 404,
        message: 'Employee not found',
        body: {},
      }
    }

    return {
      success: true,
      httpCode: 200,
      message: 'Employee fetched successfully',
      body: employee,
    }
  }
}

new Ioc().make('EmployeeService')
