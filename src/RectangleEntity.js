sooper = require('sooper');
Entity = require('../src/Entity.js');
RectangleBounds = require('../src/RectangleBounds.js');

var RectangleEntity = sooper.define({
    inherits: Entity,
    implements: RectangleBounds,
    constructor: function(config) {
        this.super(config);
        RectangleBounds.call(this,config);
    }
});

module.exports = RectangleEntity;
