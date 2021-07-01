const mongoos = require('mongoose');

const config = require('config');

const db = config.get('mongoURL');

const connectDB = async () => {
  try {
    mongoos.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MangoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
