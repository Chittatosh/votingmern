import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import sslRedirect from 'heroku-ssl-redirect';

import mongoose from './mongoose';
import passport from './passport';
import serverConfig from './serverConfig';

require('pretty-error').start();

const MongoStore = connectMongo(session);
const app = express();

if (app.get('env') === 'production') app.use(sslRedirect());

app.use(bodyParser.json());
app.use(
  session({
    secret: serverConfig.session,
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
app.use(
  express.static('dist'),
); /*
const listener = app.listen(serverConfig.port, () => {
  console.log('Success! Port:', listener.address().port);
});
*/
export default app;
