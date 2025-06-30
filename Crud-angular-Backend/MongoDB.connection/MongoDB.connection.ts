import mongoose from 'mongoose';

require('dotenv').config();

const MongoURL = process.env['MongoURL'];
// if (!MongoURL) {
//   throw new Error('MongoURL is not defined in environment variables.');
// }
mongoose
  .connect(MongoURL || '')
  .then(() => {
    console.log('Mongobd connection successfully');
  })
  .catch((error: any) => {
    console.log('Mongobd connection', error);
  });
