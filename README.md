prerender-bot-monitor
=======================
Simple prerender plugin for writing access logs based on [prerender-access-log](https://github.com/unDemian/prerender-access-log)

## So what's the difference?

This prerender plugin works absolutely the same way, with these little improvements:
* works with current version of [prerender](https://github.com/prerender/prerender) based on Headless Chrome
* there is a bonus `pac.js` log parsing script helping you extract particular bots from a given log file
* all original dependencies are `updated` and `npm audit`ed

### How to use

In your local prerender project run:

`npm install prerender-bot-monitor --save`  
or alternatively you can `clone` this repo and run `npm install`


### Configuration

Then in the server.js that initializes the prerender:  
`server.use(require('prerender-bot-monitor'));`

The plugin uses the [morgan](https://github.com/expressjs/morgan#predefined-formats) for creating logs and [file-stream-rotator](https://www.npmjs.com/package/file-stream-rotator) for managing file names.

```javascript
  var server = prerender({
    botMonitor: {
        // Check out the file-stream-rotator docs for parameters
        fileStreamRotator: {
            filename: '/var/logs/prerender/access-%DATE%.log',
            frequency: 'daily',
            date_format: 'YYYY-MM-DD',
            verbose: false
        },

        // Check out the morgan docs for the available formats
        morgan: {
            format: 'combined'
        }
    }
  });
  ```

# pac.js log parsing script
This tool is located in `utils/pac.js` along with two test files.

Simple script which can extract access log records for particular bot. For your convenience I recommend to copy
this to the folder where your access logs dwell.

### Usage

`$ node pac <file-name> [switches]`

`file-name` - the full path to the access log file (thus this is convenient to copy pac.js to the log file folder)

Possible command line switches:

`-g` filters for Googlebot Desktop  
`-gm` filters for Googlebot Mobile  
`-gi` filters for Googlebot Image  
`-gv` filters for Googlebot Video  
`-s` filters for SeznamBot  
`-b` filters for bingbot  
`-h` or `--help` prints this help  
`--short` prints short version

### License
Copyright (c) 2015 Petr -pehu- Humplík.  
Published under MIT license.

