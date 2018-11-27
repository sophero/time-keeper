const { UserSchema } = require('./schema');
const attachUserMethods = require('./methods');

attachUserMethods(UserSchema);

const User = mongoose.model('User', UserSchema);

module.exports = { User };
