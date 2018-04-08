import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import sslRedirect from 'heroku-ssl-redirect';
import { ensureLoggedIn } from 'connect-ensure-login';

import apiRouter from './api';
import passport from './passport';
import serverRender from './serverRender';
import mongoose from './mongoose';

require('dotenv').config();

const app = express();
const MongoStore = connectMongo(session);
if (app.get('env') === 'production') app.use(sslRedirect());
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, //don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      touchAfter: 24 * 3600, // update only once every 24hr unless the session data changes
    }),
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  const { user, method, body, url } = req;
  const displayName = user && user.displayName;
  console.log({ url, displayName, method, body });
  next();
});
app.use('/api', apiRouter);
app.use(express.static('dist'));

app.get('/facebooklogin', passport.authenticate('facebook'));
app.get(
  '/googlelogin',
  passport.authenticate('google', { scope: ['profile'] }),
);
app.get('/twitterlogin', passport.authenticate('twitter'));

app.get(
  '/fbredirect',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => res.redirect(req.user ? '/' : '/facebooklogin'),
);
app.get(
  '/ggredirect',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect(req.user ? '/' : '/googlelogin'),
);
app.get(
  '/ttredirect',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => res.redirect(req.user ? '/' : '/twitterlogin'),
);

app.get('/logout', (req, res) => req.session.destroy(() => res.redirect('/')));
app.get('/profile', ensureLoggedIn(), (req, res) => res.send(req.user));
app.get('/hotreload', (req, res) => {
  res.send({ message: 'I am a server route and can also be hot reloaded!' });
});

app.get('/*', serverRender);

export default app;
