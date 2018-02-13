import passport from 'passport';
import facebook from 'passport-facebook';
import google from 'passport-google-oauth20';
import twitter from 'passport-twitter';
import url from 'url';
import { User } from './schema';
import serverConfig from './serverConfig';

const findOrCreate = (strategy, profile, cb) =>
  User.findOneAndUpdate(
    { fbggId: strategy + profile.id },
    { $set: { displayName: profile.displayName, profile } },
    {new: true, upsert: true}
  )
    .then(userDoc => cb(null, userDoc._id))
    .catch(error => {
      console.error(error);
      return cb(error);
    });

passport.use(new facebook.Strategy({
  clientID: serverConfig.fbId,
  clientSecret: serverConfig.fbSecret,
  callbackURL: url.resolve(serverConfig.hostUrl, 'fbredirect'),
  profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refreshToken, profile, cb) => findOrCreate('fb', profile, cb) ));

passport.use(new google.Strategy({
  clientID: serverConfig.ggId,
  clientSecret: serverConfig.ggSecret,
  callbackURL: url.resolve(serverConfig.hostUrl, 'ggredirect'),
}, (accessToken, refreshToken, profile, cb) => findOrCreate('gg', profile, cb) ));

passport.use(new twitter.Strategy({
  consumerKey: serverConfig.ttId,
  consumerSecret: serverConfig.ttSecret,
  callbackURL: url.resolve(serverConfig.hostUrl, 'ttredirect')
}, (token, tokenSecret, profile, cb) => findOrCreate('tt', profile, cb) ));

passport.serializeUser((_id, cb) => {
  cb(null, _id);
});

passport.deserializeUser((_id, cb) => {
  User.findById(_id)
    .then(userDoc => cb(null, userDoc)) // userDoc => req.user
    .catch(error => {
      console.error(error);
      return cb(error);
    });
});

export default passport;
