import 'babel-polyfill';

import http from 'http';

import app from './app';
import { PORT } from './urlconfig';

require('pretty-error').start();

const server = http.createServer(app);
server.listen(PORT);

let currentApp = app;
if (module.hot) {
  module.hot.accept('./app', () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}
