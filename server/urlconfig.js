const PORT = process.env.PORT || 3000;

const devBool = process.env.NODE_ENV === 'development';

const HOSTURL = devBool
  ? `http://localhost:${PORT}/`
  : 'https://votingmern.herokuapp.com/';

const APIURL = `${HOSTURL}api/`;

const JSURL = devBool ? 'http://localhost:3001/main.js' : '/main.js';

export { PORT, HOSTURL, APIURL, JSURL };
