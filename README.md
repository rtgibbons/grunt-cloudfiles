# Grunt Cloud Files

## About
[Cloud Files](http://www.rackspace.com/cloud/files/) is Rackspace's cloud object storage. It's simliar to Amazon S3.

This task is based on [grunt-s3](https://github.com/pifantastic/grunt-s3) by Aaron Forsander,
and uses the [pkgcloud](https://github.com/nodejitsu/pkgcloud) client by Nodejitsu.

This is all designed to work with Rackspace Cloud Files, and hasn't been tested on OpenStack Storage.

## Installation
1. `npm install grunt-cloudfiles --save-dev` (or manually add `grunt-cloudfiles` to your `package.json`).
1. Add `grunt.loadNpmTasks('grunt-cloudfiles');` to `Gruntfile.js`

## Configuration

Add the task to your Gruntfile's **grunt.initConfig**:
```javascript
cloudfiles: {
  prod: {
    'user': 'your Rackspace username',
    'key': 'your Rackspace API key',
    'region': 'DFW',
    'upload': [{
      'container': 'name of your Cloud Files container',
      'src': 'source/static/**/*',
      'dest': 'some/folder/',
      'stripcomponents': 1,
      'purge': {
        'emails': ['your@email.com'],
        'files': ['index.html']
      }
    }]
  }
}
```

**Stripcomponents** (as in tar) will strip _X_ leading path parts from the source dir.
In the example above, the file `source/static/js/app/main.js`
will be uploaded to `some/folder/static/js/app/main.js`, with the `source/` part being removed.

Since this is a multi task, you can add **multiple targets** as needed.
In this example we only have `prod`, but you could have `staging`, etc.

Remember that your Rackspace **API key** is private. If you are commiting your Gruntfile
to a public repository, you probably want to store it in a separate local_config.json file.

For Rackspace UK users an additional configuration parameter `authUrl` is required to use the correct CDN url for UK accounts.

```javascript
cloudfiles: {
  prod: {
    ...
    'region': 'LON',
    'authUrl': 'https://lon.identity.api.rackspacecloud.com',
    ...
  }
}
```

## Changelog

### 0.1.1
* added an option to purge files after the upload

### 0.1.0

* added support for regions
* added syncing based on MD5 Hash
* added ability to create and/or set the CDN enabled container if neither exists
* cleaned up code and moved from deferreds

### 0.0.4

* Added support for Rackspace UK cloudfile accounts

### 0.0.3

* Allow for destination folder in container

### 0.0.2

* Migrated to pkgcloud cloud
* Support grunt >= 0.4.0

### 0.0.1

* Auth and adding files

## Future Work

* Provide full management of files
* Implement meta tags

## Credits
* [Aaron Forsander <pifantastic>](https://github.com/pifantastic/grunt-s3)

 [grunts3]: https://github.com/pifantastic/grunt-s3
 [noddecloudfiles]: https://github.com/nodejitsu/node-cloudfiles
 [nodejitsu]: https://github.com/nodejitsu
