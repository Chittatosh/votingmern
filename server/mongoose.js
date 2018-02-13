import mongoose from 'mongoose';
import serverConfig from './serverConfig';

mongoose.Promise = global.Promise;

mongoose.set('debug', true);

mongoose.connect(serverConfig.mlabUri, { useMongoClient: true })
  .then(() => console.log('Mongoose connected!'))
  .catch(error => {
    console.error('Catch:', error);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

export default mongoose;
