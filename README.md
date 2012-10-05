# Grunt Cloudfiles

## About
Cloudfiles is Rackspace's cloud object storage. It's simliar to Amazon S3 and is based on [grunt-s3][grunts3]. This uses the [node-cloudfiles][nodecloudfiles] by [Nodejitsu][nodejitsu]. This is all designed to work with Rackspace Cloudfiles and hasn't been tested on Open Stack.

## Installation

1. npm install grunt-cloudfiles ***OR*** add `grunt-cloudfiles` to your `package.json
1. Add `grunt.registerNpmTasks('grunt-cloudfiles');` to `grunt.js`

## Configuration

*TODO* - Talk about grunt.js setup

## Changelog

* Auth and adding files

## Future Work

* Provide full management of files
* Implement meta tags

## Credits
* [Aaron Forsander <pifantastic>](https://github.com/pifantastic/grunt-s3)

 [grunts3]: https://github.com/pifantastic/grunt-s3
 [noddecloudfiles]: https://github.com/nodejitsu/node-cloudfiles
 [nodejitsu]: https://github.com/nodejitsu
