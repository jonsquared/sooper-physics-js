sooper = require('sooper');

CircleBounds = sooper.define({
    statics: {
        TYPE: 0x0001
    },
    radius: 0.5,
    constructor: function(config) {
        if (config && config.radius != undefined)
            this.radius = config.radius;
    }
});
CircleBounds.prototype.boundsType = CircleBounds.TYPE;

module.exports = CircleBounds;
