const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose.connect(process.env.DB_URI, () =>
    console.log('=> MongoDB is connected <=')
  );
};

module.exports = connectDB;
