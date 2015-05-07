sooper = require('sooper');
CircleBounds = require('./CircleBounds');
RectangleBounds = require('./RectangleBounds');
Entity = require('./Entity');

var CollisionDetector = sooper.define({

    constructor: function() {
        var funcs = this.collideFuncs = {};
        funcs[CircleBounds.TYPE] = this.collideCircleCircle;
        funcs[RectangleBounds.TYPE] = this.collideRectangleRectangle;
        funcs[CircleBounds.TYPE|RectangleBounds.TYPE] = this.collideCircleRectangle;
    },

    detect: function(entities) {
        var funcs = this.collideFuncs,
            collisions = [],
            len = entities.length,
            collider, collidee,
            colliderCategory, colliderMask;
        for (var i=0; i<len-1; i++) {
            collider = entities[i];
            if (collider.type == Entity.STATIC ||
                !(colliderCategory = collider.collisionCategory) ||
                !(colliderMask = collider.collisionMask))
                continue;
            for (var j=i+1; j<len; j++) {
                collidee = entities[j];
                if (colliderMask&collidee.collisionCategory &&
                    collidee.collisionMask&colliderCategory &&
                    funcs[collider.boundsType|collidee.boundsType](collider,collidee))
                    collisions.push(collider,collidee);
            }
        }
        return collisions;
    },

    collideCircleCircle: function(collider, collidee) {
        var dx=collidee.x-collider.x,
            dy=collidee.y-collider.y,
            distance = Math.sqrt( dx*dx + dy*dy );
        return distance <= collider.radius + collidee.radius;
    },

    collideRectangleRectangle: function(collider, collidee) {
        var halfWidth1 = collider.width/2,
            halfHeight1 = collider.height/2,
            halfWidth2 = collidee.width/2,
            halfHeight2 = collidee.height/2;

        return !(collider.y + halfHeight1 < collidee.y - halfHeight2 ||
                 collider.y - halfHeight1 > collidee.y + halfHeight2 ||
                 collider.x + halfWidth1 < collidee.x - halfWidth2 ||
                 collider.x - halfWidth1 > collidee.x + halfWidth2);
    },

    collideCircleRectangle: function(collider, collidee) {
        var circle = collider.boundsType == CircleBounds.TYPE ? collider : collidee,
            rectangle = collider === circle ? collidee : collider,
            halfWidth = rectangle.width/2,
            halfHeight = rectangle.height/2,
            closestX = Math.min(Math.max(rectangle.x-halfWidth,circle.x),rectangle.x+halfWidth),
            closestY = Math.min(Math.max(rectangle.y-halfHeight,circle.y),rectangle.y+halfHeight),
            dx=circle.x-closestX,
            dy=circle.y-closestY,
            distance = Math.sqrt( dx*dx + dy*dy );

        return distance <= circle.radius;
     }
});

module.exports = CollisionDetector;
