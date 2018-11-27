const UsersController = require('./controllers/users_controller');
const authenticate = require('./middleware/authenticate');

module.exports = (app) => {
  app.post('/users/login', UsersController.login);
  app.post('/users/new', UsersController.createUser);
  app.get('/users/me', authenticate, UsersController.returnUser);
  app.delete('/users/me/token', authenticate, UsersController.removeToken);  
}