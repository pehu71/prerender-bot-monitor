const morgan = require('morgan');
const FileStreamRotator = require('file-stream-rotator');
const fs = require('fs');

module.exports = {

    init: function (server) {
        this.options = server.options;
        this.stream = FileStreamRotator.getStream(this.options.botMonitor.fileStreamRotator);
    },
    
    pageLoaded: function(req, res, next) {
        if (this.options.botMonitor.flush && (!this.options.botMonitor.flushPattern || new RegExp(this.options.botMonitor.flushPattern).test(req.url))) {
            const fileName = `${req.url}--${new Date().toString()}.html`.replace(/[\/\s\:\+]/g, '-')
            fs.writeFile(`${this.options.botMonitor.flushDir}${fileName}`, req.prerender.content.toString(), (err) => {console.log(err)});
        }

        next();
    },    

    beforeSend: function (req, res, next) {
        morgan(this.options.botMonitor.morgan.format, {stream: this.stream})(req, res, next);
    }
};
