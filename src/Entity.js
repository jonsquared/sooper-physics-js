sooper = require('sooper');

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
    constructor: function(config) {
        if (!config)
            return;
        if (!isNaN(config.type))
            this.type = config.type;
        if (config.x)
            this.x = config.x;
        if (config.y)
            this.y = config.y;
        if (config.vx)
            this.vx = config.vx;
        if (config.vy)
            this.vy = config.vy;
        if (config.ax)
            this.ax = config.ax;
        if (config.ay)
            this.ay = config.ay;
        if (config.restitution)
            this.restitution = config.restitution;
        if (!isNaN(config.friction))
            this.friction = config.friction;
    }
});
Entity.prototype.type = Entity.DYNAMIC;

module.exports = Entity;
