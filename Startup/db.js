const mongoose = require('mongoose');
const config = require('config');

module.exports = function (url) {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('db : connected successfully'))
    .catch(err => console.log('db : connection failed , error : ', err.message));
};
