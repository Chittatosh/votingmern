import { ensureLoggedIn } from 'connect-ensure-login';

import app from './app';
import apiRouter from './api';
import passport from './passport';
import prettyjson from 'prettyjson';
import serverRender from './serverRender';

app.get('/facebooklogin', passport.authenticate('facebook'));
app.get('/googlelogin', passport.authenticate('google', { scope: ['profile'] }));
app.get('/twitterlogin', passport.authenticate('twitter'));

app.get('/fbredirect',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => res.redirect(req.user ? '/' : '/facebooklogin')
);
app.get('/ggredirect',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect(req.user ? '/' : '/googlelogin')
);
app.get('/ttredirect',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => res.redirect(req.user ? '/' : '/twitterlogin')
);

app.get('/profile', ensureLoggedIn(), (req, res) => res.send(req.user));

app.get('/message', (req, res) => {
  res.send({ message: 'I am a server route and can also be hot reloaded!' });
});

app.use((req, res, next) => {
  const {user, method, url, body} = req;
  const settings = app.settings.env;
  const displayName = user && user.displayName;
  console.log(prettyjson.render({settings, displayName, method, url, body}));
  next();
});

app.use('/api', apiRouter);

app.get('/logout', (req, res) => req.session.destroy(() => res.redirect('/')));

app.get('/*', serverRender);

export default app;
