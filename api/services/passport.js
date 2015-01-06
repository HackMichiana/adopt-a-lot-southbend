var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
var Promise = require('bluebird');
compare = Promise.promisify(require('bcrypt').compare);

function InvalidCredentialsError(message) {
  this.message = message;
  this.name = "InvalidCredentialsError";
}
InvalidCredentialsError.prototype = Object.create(Error.prototype);
InvalidCredentialsError.prototype.constructor = InvalidCredentialsError;

// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  sails.models.user.findOneById(id).exec(done);
});

// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a email and password), and invoke a callback
// with a user object.
passport.use(new LocalStrategy(
  {usernameField: 'email'},
  function (email, password, done) {
    sails.models.user.findOneByEmail(email)
      .then(function(user) {
        if(!user) throw new InvalidCredentialsError();

        return [user, compare(password, user.password)];
      })
      .spread(function(user, res) {
        if(!res) throw new InvalidCredentialsError();

        done(null, user, {message: 'Logged In Successfully'});
      })
      .catch(InvalidCredentialsError, function(err) {
        done(null, false, {message: 'Invalid Credentials'});
      })
      .catch(function(err) {
        done(err);
      });
  }
));
