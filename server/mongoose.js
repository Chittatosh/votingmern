import mongoose from 'mongoose';

require('dotenv').config();

mongoose.Promise = global.Promise;

mongoose.set('debug', true);

mongoose
  .connect(process.env.MLAB_URI, { useMongoClient: true })
  .then(() => console.log('Mongoose connected!'))
  .catch(error => {
    console.error('Catch:', error);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

export default mongoose;
