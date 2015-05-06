sooper = require('sooper');
Entity = require('./Entity');
RectangleBounds = require('./RectangleBounds');

var RectangleEntity = sooper.define({
    inherits: Entity,
    implements: RectangleBounds,
    constructor: function(config) {
        this.super(config);
        RectangleBounds.call(this,config);
    }
});

module.exports = RectangleEntity;
