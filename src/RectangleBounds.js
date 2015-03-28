sooper = require('sooper');

RectangleBounds = sooper.define({
    statics: {
        TYPE: 'rectangle'
    },
    width: 1,
    height: 1,
    constructor: function(config) {
        if (!config) return;
        if (config.width != undefined)
            this.width = config.width;
        if (config.height != undefined)
            this.height = config.height;
    }
});
RectangleBounds.prototype.boundsType = RectangleBounds.TYPE;

module.exports = RectangleBounds;
