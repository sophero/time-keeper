const _ = require('lodash');
const { User } = require('../models/user/model');

module.exports = {
  createUser(req, res) {
    var body = _.pick(req.body, ['email', 'password', 'name']);
    var user = new User(body);
    user.save()
      .then(() => {
        return user.generateAuthToken();
      })
      .then(token => {
        res.header('x-auth', token).send(_.pick(user, ['name', 'email']));
      })
      .catch(e => {
        res.status(400).send(e);
      });
  },

  returnUser(req, res) {
    res.send(req.user);
  },

  login(req, res) {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password)
      .then(user => {
        return user.generateAuthToken().then(token => {
          res.header('x-auth', token).send(_.pick(user, ['name', 'email']));
        });
      })
      .catch(e => {
        res.status(400).send();
      });
  },

  removeToken(req, res) {
    req.user.removeToken(req.token).then(
      () => {
        res.status(200).send();
      },
      () => {
        res.status(400).send();
      }
    );
  }
}