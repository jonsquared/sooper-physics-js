sooper = require('sooper');
Entity = require('./Entity');
CircleBounds = require('./CircleBounds');

var CircleEntity = sooper.define({
    inherits: Entity,
    implements: CircleBounds,
    constructor: function(config) {
        this.super(config);
        CircleBounds.call(this,config);
    }
});

module.exports = CircleEntity;
