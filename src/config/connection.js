const mongoose = require('mongoose');
const { MONGO_URI } = require('.');

exports.getConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return 'Connection Success!';
  } catch (error) {
    return 'Connection Failed!';
  }
};
