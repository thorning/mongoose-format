var formatPlugin = function (schema, options) {
  var formats = [];
  schema.static('addFormat', function (formatName, format) {
    formats[formatName] = format;
  });
  schema.static('format', function (data, formatName, done, opts) {
    return formats[formatName].call(data, done, opts);
  });
  schema.methods.format = function (formatName, done, opts) {
    return formats[formatName].call(this, done, opts);
  };
};

module.exports = formatPlugin;
