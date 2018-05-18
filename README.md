prerender-bot-monitor
=======================
Simple prerender plugin for writing access logs based on [prerender-access-log](https://github.com/unDemian/prerender-access-log)

## So what's the difference?

This prerender plugin works absolutely the same way, with these little improvements:
* works with current version of [prerender](https://github.com/prerender/prerender) based on Headless Chrome
* all original dependencies are `updated` and `npm audit`ed

How to use
----------

In your local prerender project run:

`npm install prerender-bot-monitor --save`

Then in the server.js that initializes the prerender:

`server.use(require('prerender-bot-monitor'));`

Configuration
-------------
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

Published under MIT license.
