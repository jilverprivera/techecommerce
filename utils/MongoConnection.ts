import mongoose from 'mongoose';

const { MONGODB_URL, MONGODB_URL_TEST, NODE_ENV } = process.env;
const connectionURL = NODE_ENV === 'test' ? MONGODB_URL_TEST : MONGODB_URL;

const connection = {
  isConnected: 0,
};

const MongoConnect = async () => {
  if (connection.isConnected === 1) return;
  if (!connectionURL) {
    throw new Error('Could not access to database.');
  }
  const db = await mongoose.connect(connectionURL);
  connection.isConnected = db.connections[0].readyState;
  NODE_ENV === 'development' && console.log('Database: active');
  return db;
};

export default MongoConnect;
