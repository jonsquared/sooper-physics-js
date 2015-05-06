sooper = require('sooper');

RectangleBounds = sooper.define({
    statics: {
        TYPE: 0x0002
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
