import Employee from 'App/Models/Employee'

export default class EmployeeRepository {
  private Employee: typeof Employee

  constructor() {
    this.Employee = Employee
  }

  public async getAll(): Promise<Employee[]> {
    return this.Employee.all()
  }

  public async getByUserId(userId: string): Promise<Employee | null> {
    return this.Employee.findBy('user_id', userId)
  }
}
