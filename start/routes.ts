import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/users', 'Api/v1/UsersController.index')
  Route.post('/users', 'Api/v1/UsersController.create')
  Route.post('/login', 'Api/v1/AuthController.login')
  Route.post('/logout', 'Api/v1/AuthController.logout')
}).prefix('/api/v1')
