#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender({
	botMonitor: {
		// Check out the file-stream-rotator docs for parameters
		fileStreamRotator: {
			filename: '/var/log/prerender/access-%DATE%.log',
			frequency: 'daily',
			date_format: 'YYYY-MM-DD',
			verbose: false
		},

		// Check out the morgan docs for the available formats
		morgan: {
			format: 'combined'
		},
		
		// directory where the rendered pages will be stored
		flushDir: '/home/pehu/Cache/',
		
		// flushes all output if empty ('') or if pattern matches
		flushPattern: '',
		
		// flushing on/off switch
		flush: true		
    }
});

server.use(prerender.sendPrerenderHeader());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
server.use(require('prerender-bot-monitor'));

server.start();
