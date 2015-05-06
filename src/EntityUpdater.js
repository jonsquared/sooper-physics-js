sooper = require('sooper');
Entity = require('./Entity');

var EntityUpdater = sooper.define({
    statics: {
        GRAVITY_X: 0,
        GRAVITY_Y: 0
    },
    update: function(entities, elapsedTime) {
        var gx = EntityUpdater.GRAVITY_X * elapsedTime,
            gy = EntityUpdater.GRAVITY_Y * elapsedTime;

        for (var i=0, length=entities.length; i<length; i++) {
            var entity = entities[i];
            switch(entity.type) {
                case Entity.DYNAMIC:
                    entity.vx += entity.ax * elapsedTime + gx;
                    entity.vy += entity.ay * elapsedTime + gy;
                    entity.x += entity.vx * elapsedTime;
                    entity.y += entity.vy * elapsedTime;
                    break;
                case Entity.KINEMATIC:
                    entity.vx += entity.ax * elapsedTime;
                    entity.vy += entity.ay * elapsedTime;
                    entity.x += entity.vx * elapsedTime;
                    entity.y += entity.vy * elapsedTime;
                    break;
            }
        }
    }
});

module.exports = EntityUpdater;
