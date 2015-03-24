sooper = require('sooper');
RectangleBounds = require('../src/CircleBounds.js');

var Entity = sooper.define({
    statics: {
        STATIC: 0,
        KINEMATIC: 1,
        DYNAMIC: 2
    },
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0,
    restitution: 0,
    friction: 1,
    constructor: function() {
        this.bounds = new CircleBounds();
    }
});
Entity.prototype.type = Entity.DYNAMIC;

module.exports = Entity;
