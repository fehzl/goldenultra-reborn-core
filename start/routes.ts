import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/users', 'Api/v1/UsersController.create')
}).prefix('/api/v1')
