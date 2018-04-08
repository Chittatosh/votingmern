import passport from 'passport';
import facebook from 'passport-facebook';
import google from 'passport-google-oauth20';
import twitter from 'passport-twitter';
import url from 'url';
import { User } from './schema';
import { HOSTURL } from './urlconfig';

require('dotenv').config();

const findOrCreate = (strategy, profile, cb) =>
  User.findOneAndUpdate(
    { fbggId: strategy + profile.id },
    { $set: { displayName: profile.displayName, profile } },
    { new: true, upsert: true },
  )
    .then(userDoc => cb(null, userDoc._id))
    .catch(error => {
      console.error(error);
      return cb(error);
    });

passport.use(
  new facebook.Strategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: url.resolve(HOSTURL, 'fbredirect'),
      profileFields: ['id', 'displayName', 'photos', 'email'],
    },
    (accessToken, refreshToken, profile, cb) => findOrCreate('fb', profile, cb),
  ),
);

passport.use(
  new google.Strategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: url.resolve(HOSTURL, 'ggredirect'),
    },
    (accessToken, refreshToken, profile, cb) => findOrCreate('gg', profile, cb),
  ),
);

passport.use(
  new twitter.Strategy(
    {
      consumerKey: process.env.TWITTER_ID,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: url.resolve(HOSTURL, 'ttredirect'),
    },
    (token, tokenSecret, profile, cb) => findOrCreate('tt', profile, cb),
  ),
);

passport.serializeUser((_id, cb) => {
  cb(null, _id);
  console.log('\x1b[41m%s\x1b[0m', 'serializeUser');
});

passport.deserializeUser((_id, cb) => {
  User.findById(_id)
    .then(userDoc => {
      cb(null, userDoc);
      console.log('\x1b[41m%s\x1b[0m', 'deserializeUser');
    }) // userDoc => req.user
    .catch(error => {
      console.error(error);
      return cb(error);
    });
});

export default passport;

