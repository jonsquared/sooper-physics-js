sooper = require('sooper');
Entity = require('./Entity');
EntityUpdater = require('./EntityUpdater');
CollisionDetector = require('./CollisionDetector');

var Engine = sooper.define({
    constructor: function(config) {
        this.entities = [];
        if (config) {
            var entityUpdaterConfig = config.entityUpdater,
                collisionDetectorConfig = config.collisionDetector;
        }
        this.entityUpdater = entityUpdaterConfig instanceof EntityUpdater ? entityUpdaterConfig : new EntityUpdater(entityUpdaterConfig);
        this.collisionDetector = collisionDetectorConfig instanceof CollisionDetector ? collisionDetectorConfig : new CollisionDetector(collisionDetectorConfig);
    },
    step: function(elapsedTime) {
        this.entityUpdater.update(this.entities,elapsedTime);
        var collisions = this.collisionDetector.detect(this.entities);
    }
});

module.exports = Engine;
