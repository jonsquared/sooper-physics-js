sooper = require('sooper');
Entity = require('./Entity');
EntityUpdater = require('./EntityUpdater');
CollisionDetector = require('./CollisionDetector');

var Engine = sooper.define({
    constructor: function(config) {
        this.entities = [];
        this.entityUpdater = config && config.entityUpdater || new EntityUpdater();
        this.collisionDetector = config && config.collisionDetector || new CollisionDetector();
    },
    step: function(elapsedTime) {
        this.entityUpdater.update(this.entities,elapsedTime);
        var collisions = this.collisionDetector.detect(this.entities);
    }
});

module.exports = Engine;
