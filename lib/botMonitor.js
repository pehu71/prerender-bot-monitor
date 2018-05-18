const morgan = require('morgan');
const FileStreamRotator = require('file-stream-rotator');

module.exports = {

    init: function (server) { // todo: create directory here
        this.options = server.options;
        this.stream = FileStreamRotator.getStream(this.options.botMonitor.fileStreamRotator);
    },

    beforeSend: function (req, res, next) {
        morgan(this.options.botMonitor.morgan.format, {stream: this.stream})(req, res, next);
    }
};
