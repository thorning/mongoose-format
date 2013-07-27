var mongoose      = require('mongoose'),
    format_plugin = require('../');

var schema = new mongoose.Schema({
  name : { first: String, last: String },
  age  : Number
});

schema.plugin(format_plugin);

var Model;

try {
  Model = mongoose.model('Model', schema);

  Model.addFormat('standard', function () {
    return this;
  });

  Model.addFormat('standard', 2, function () {
    return {
      name : this.name.first + ' ' + this.name.last,
      age  : this.age
    };
  });
} catch (err) {
  Model = mongoose.model('Model');
}

module.exports = exports = Model;
