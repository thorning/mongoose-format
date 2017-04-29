var common = require('common');
var _      = require('underscore');

var format_plugin = (schema, options) => {
  var versions = {};
  schema.static('addFormat', (format_name, version, format) => {
    if (typeof(version) !== 'number') {
      format = version;
      version = 'none';
    }
    if (!versions[version]) {
      versions[version] = {};
    }
    versions[version][format_name] = format;
  });

  schema.static('format', (data, format_name, version, done, opts) => {
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
        next => {
          _.each(data, obj => {
            versions[version][format_name].call(obj, next.parallel(), opts);
          })
        },
        result => {
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
