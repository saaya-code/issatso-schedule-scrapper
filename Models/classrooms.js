const mongoose = require('mongoose');

exports.Major = mongoose.model(
  'Classroom',
  new mongoose.Schema({
      label : {Type :String, required: true},
      availability : {Type: Object, required: true}
  })
);
