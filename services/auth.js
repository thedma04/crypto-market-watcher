import passport from 'passport';
import LocalStrategy from 'passport-local';

import db from '../models';

/**
 *
 * Local Strategy Auth
 */

// Passport serialize session
passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((user, done) => {
    db.User.findById(user.id).then(function(user){
        done(null, user)
    }).catch(function(err){
        done(null, false)
    })
});


const localOpts = { usernameField: 'email' };

const localLogin = new LocalStrategy(
  localOpts,
  async (email, password, done) => {
    try {
      const user = await db.User.findOne({ email });

      console.log(password)
      if (!user) {
        return done(null, false);
      } else if (!user.comparePassword(password)) {
        return done(null, false);
      }

      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  },
);

passport.use(localLogin);
export default passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signup'
});
