module.exports = function(grunt) {
  var cf = require('cloudfiles'),
    path = require('path'),
    util = require('util'),
    _ = grunt.utils._;

  _.mixin(require('underscore.deferred'));

  var cfAuth = {},
    client, cf_container_name, config, cfConfig;

  function stripComponents(path, num, sep) {
    if(sep === undefined) sep = '/';
    var aString = path.split(sep)
    if(aString.length <= num) {
      return aString[aString.length - 1];
    } else {
      aString.splice(0, num);
      return aString.join(sep);
    }
  }

  grunt.registerMultiTask('cloudfiles', 'Move stuff to the cloud', function() {
    var done = this.async(),
      errors = 0;

    config = this.data;
    cfAuth = {
      'auth': {
        'username': config.user,
        'apiKey': config.key
      }
    };

    client = cf.createClient(cfAuth);

    var cfActivity = [];

    _.when(grunt.helper('cf.init')).done(function(init) {
      grunt.log.debug(init + "\n  " + util.inspect(cfConfig));
      config.upload.forEach(function(upload) {
        grunt.log.subhead('Uploading into ' + upload.container);
        var files = grunt.file.expandFiles(upload.src);

        files.forEach(function(file) {
          var ufile = file;
          if(upload.stripcomponents !== undefined) {
            ufile = stripComponents(ufile, upload.stripcomponents);
          }
          cfActivity.push(grunt.helper('cf.addFile', upload.container, file, ufile))
        })
      });

      var total = cfActivity.length;
      var errors = 0;

      cfActivity.forEach(function(activity) {
        activity.done(function(msg) {});
        activity.fail(function(msg) {
          grunt.log.error(msg);
          ++errors;
        });
        activity.always(function() {
          // If this was the last transfer to complete, we're all done.
          if(--total === 0) {
            grunt.log.write('Finished uploading ' + cfActivity.length + ' item(s)')
            done(!errors);
          }
        });
      });
    }).fail(function(err) {
      grunt.log.error('Error with intiallization of Cloudfiles ::\n\t' + err);
    });


  });

  grunt.registerHelper('cf.init', function() {
    var dfd = _.Deferred();
    var async

    grunt.log.debug('Authenticating on Cloudfiles');
    client.setAuth(function(err, res, config) {
      if(err) {
        dfd.reject(err);
      } else {
        cfConfig = config;
        dfd.resolve('Authentication Complete');
      }
    });

    return dfd;
  });

  grunt.registerHelper('cf.addFile', function(container, src, dest) {
    grunt.log.debug('Starting an upload');
    var dfd = _.Deferred();

    client.addFile(container, {
      'remote': dest,
      'local': src
    }, function(err, uploaded, res) {
      if(err) {
        dfd.reject(err);
      } else {
        dfd.resolve(uploaded);
      }
    });

    return dfd;
  });
}
