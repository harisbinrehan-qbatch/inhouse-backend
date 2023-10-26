import passport from 'passport';
import jwt from 'passport-jwt';

import User from '../models/user';

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secretKey',
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      console.log('\n\n', 'jwtPayload', jwtPayload);
      const user = await User.findOne({ email: jwtPayload.email });
      if (user) {
        return done(null, user);
      }
      return done(null, false); // User not found
    } catch (error) {
      console.error('Error in JWT strategy:', error);
      return done(error, false);
    }
  })
);

