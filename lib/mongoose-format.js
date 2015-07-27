var common = require('common'),
    _      = require('underscore');

var format_plugin = function (schema, options) {
  var versions = {};
  schema.static('addFormat', function (format_name, version, format) {
    if (typeof(version) !== 'number') {
      format = version;
      version = 'none';
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
      version = 'none';
    }

    if (!data) {
      done();
      return;
    }

    if (!opts) {
      opts = {};
    }
    
    if (_.isArray(data)) {
      if (data.length < 1) {
        done(null, []);
        return;
      }

      common.step([
        function (next) {
          _.each(data, function (obj) {
            versions[version][format_name].call(obj, next.parallel(), opts);
          })
        },
        function (result) {
          result = _.compact(result)
          done(null, result);
        }
      ], done)
    } else {
      return versions[version][format_name].call(data, done, opts);
    }

    
  });

  schema.methods.format = function (format_name, version, done, opts) {
    return schema.statics.format.call(this, this, format_name, version, done, opts);
  };
};

module.exports = exports = format_plugin;
