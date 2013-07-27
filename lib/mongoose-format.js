var format_plugin = function (schema, options) {
  var versions = {};
  schema.static('addFormat', function (format_name, version, format) {
    if (typeof(version) !== 'number') {
      format = version;
      version = 1;
    }
    if (!versions[version]) {
      versions[version] = {};
    }
    versions[version][format_name] = format;
  });
  schema.static('format', function (data, format_name, version, done, opts) {
    if (typeof(version) !== 'number') {
      opts = done;
      done = version;
      version = 1;
    }
    return versions[version][format_name].call(data, done, opts);
  });
  schema.methods.format = function (format_name, version, done, opts) {
    return schema.statics.format.call(this, this, format_name, version, done, opts);
  };
};

module.exports = exports = format_plugin;
