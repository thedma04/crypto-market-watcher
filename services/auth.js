const passport = require('passport');
const LocalStrategy = require('passport-local')
const db = require('../models')

/**
 * Local Strategy Auth
 */

// Passport serialize session
passport.serializeUser(function(user, done){
    done(null, user)
})

passport.deserializeUser(function(user, done){
    db.User.findById(user.id).then(function(user){
        done(null, user)
    }).catch(function(err){
        done(null, false)
    })
})


const localOpts = { usernameField: 'email' };

const localLogin = new LocalStrategy(
  localOpts,
  async (email, password, done) => {
    try {
      const user = await db.User.findOne({ email });

      if (!user) {
        return done(null, false);
      } else if (!user.authenticateUser(password)) {
        return done(null, false);
      }

      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  },
);

passport.use(localLogin)
module.exports = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signup'
})
