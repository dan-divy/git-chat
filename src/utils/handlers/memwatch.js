const memwatch = require('memwatch-next');

memwatch.on('leak', function(info) {
    console.log(info);
});

module.exports = memwatch;