import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/users', 'Api/v1/UsersController.index')
  Route.post('/users', 'Api/v1/UsersController.create')
  Route.post('/login', 'Api/v1/AuthController.login')
  Route.post('/logout', 'Api/v1/AuthController.logout')
  Route.get('/groups', 'Api/v1/GroupsController.index')
  Route.post('/groups', 'Api/v1/GroupsController.create')
  Route.get('/devices', 'Api/v1/DevicesController.index')
  Route.post('/devices', 'Api/v1/DevicesController.create')
  Route.get('/orders', 'Api/v1/OrdersController.index')
  Route.post('/orders', 'Api/v1/OrdersController.create')
}).prefix('/api/v1')
