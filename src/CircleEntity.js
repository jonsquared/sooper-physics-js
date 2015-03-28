sooper = require('sooper');
Entity = require('../src/Entity.js');
CircleBounds = require('../src/CircleBounds.js');

var CircleEntity = sooper.define({
    inherits: Entity,
    implements: CircleBounds,
    constructor: function(config) {
        this.super(config);
        CircleBounds.call(this,config);
    }
});

module.exports = CircleEntity;
