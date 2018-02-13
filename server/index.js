import http from 'http';
import server from './server';
import serverConfig from './serverConfig';

const httpServer = http.createServer(server);
let currentApp = server;
httpServer.listen(serverConfig.port);

if (module.hot) {
  module.hot.accept('./server', () => {
    httpServer.removeListener('request', currentApp);
    httpServer.on('request', server);
    currentApp = server;
  });
}
