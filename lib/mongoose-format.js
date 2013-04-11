var formatPlugin = function (schema, options) {
  var formats = [];
  schema.static('addFormat', function (formatName, format) {
    formats[formatName] = format;
  });
  schema.methods.format = function (formatName, done, opts) {
    return formats[formatName].call(this, done, opts);
  };
};

module.exports = formatPlugin;
