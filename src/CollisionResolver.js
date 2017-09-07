sooper = require('sooper');
CircleBounds = require('./CircleBounds');
RectangleBounds = require('./RectangleBounds');
Entity = require('./Entity');

var CollisionResolver = sooper.define({

    constructor: function(config) {
        this.restitutionMap = config && config.restitutionMap || {};
        if (config && config.getRestitution)
            this.getRestitution = config.getRestitution;
        var funcs = this.resolveFuncs = {};
        funcs[CircleBounds.TYPE] = this.resolveCircleCircle;
        funcs[RectangleBounds.TYPE] = this.resolveRectangleRectangle;
        funcs[CircleBounds.TYPE|RectangleBounds.TYPE] = this.resolveCircleRectangle;
    },

    getRestitution: function(collider, collidee) {
        var restitution;
        if (collider && collidee)
            restitution = this.restitutionMap[collider.collisionCategory | collidee.collisionCategory];
        return restitution || 0;
    },

    resolve: function(collisions, elapsedTime) {
        var funcs = this.resolveFuncs;
        for (var i=0; i<collisions.length; ) {
            var collider = collisions[i++],
                collidee = collisions[i++];
            funcs[collider.boundsType|collidee.boundsType].call(this,collider,collidee,elapsedTime);
        }
    },

    resolveCircleCircle: function(collider, collidee, elapsedTime) {
        function length(x,y) {
            return Math.sqrt(x*x+y*y);
        }
        function dot(x1,y1,x2,y2) {
            return x1*x2 + y1*y2;
        }

        var collisionDistance = collider.radius + collidee.radius,
            dx = collidee.x - collider.x,
            dy = collidee.y - collider.y,
            distance = length(dx,dy);

        if (!(collider.vx || collider.vy || collidee.vx || collidee.vy)) {
            var halfOverlapDistance = (collisionDistance - distance)/2,
                collisionNormalLength = length(dx,dy),
                collisionNormalX = dx/collisionNormalLength,
                collisionNormalY = dy/collisionNormalLength,
                separationX = collisionNormalX*halfOverlapDistance,
                separationY = collisionNormalY*halfOverlapDistance;
            collider.x -= separationX;
            collider.y -= separationY;
            collidee.x += separationX;
            collidee.y += separationY;
            return;
        }

        //Step 1: Move circles back to moment of collision
        var prevColliderX = collider.x - collider.x * elapsedTime,
            prevColliderY = collider.y - collider.y * elapsedTime,
            prevCollideeX = collidee.x - collidee.x * elapsedTime,
            prevCollideeY = collidee.y - collidee.y * elapsedTime,
            prevDX = prevCollideeX - prevColliderX,
            prevDY = prevCollideeY - prevColliderY,
            prevDistance = length(prevDX,prevDY),
            deltaDistance = distance - prevDistance,
            deltaCollisionDistance = collisionDistance - prevDistance,
            collisionTimeFactor = deltaCollisionDistance/deltaDistance,
            collisionTime = elapsedTime*collisionTimeFactor,
            remainingTime = elapsedTime - collisionTime;

        collider.x = prevColliderX + collider.vx*remainingTime;
        collider.y = prevColliderY + collider.vy*remainingTime;
        collidee.x = prevCollideeX + collidee.vx*remainingTime;
        collidee.y = prevCollideeY + collidee.vy*remainingTime;

        //Step 2: Calculate new velocity vectors
        var restitution = this.getRestitution(collider,collidee);

        // Calculate the normal of the collision plane.
        var collisionNormalVectorX = collidee.x - collider.x,
            collisionNormalVectorY = collidee.y - collider.y,
            collisionNormalLength = length(collisionNormalVectorX,collisionNormalVectorY);
        collisionNormalVectorX /= collisionNormalLength;
        collisionNormalVectorY /= collisionNormalLength;

        // Calculate the collision plane.
        var collisionVectorX = -collisionNormalVectorY,
            collisionVectorY = collisionNormalVectorX;

        // Calculate prior velocities relative the the collision plane and normal.
        var colliderNormalVelocity = dot(collider.vx,collider.vy,collisionNormalVectorX,collisionNormalVectorY),
            colliderCollisionVelocity = dot(collider.vx,collider.vy,collisionVectorX,collisionVectorY),
            collideeNormalVelocity = dot(collidee.vx,collidee.vy,collisionNormalVectorX,collisionNormalVectorY),
            collideeCollisionVelocity = dot(collidee.vx,collidee.vy,collisionVectorX,collisionVectorY);

        // Calculate the scaler velocities of each object after the collision.
        var colliderNormalVelocityAfter = restitution*((colliderNormalVelocity * (collider.mass - collidee.mass)) + (2 * collidee.mass * collideeNormalVelocity)) / (collidee.mass + collider.mass),
            collideeNormalVelocityAfter = restitution*((collideeNormalVelocity * (collidee.mass - collider.mass)) + (2 * collider.mass * colliderNormalVelocity)) / (collidee.mass + collider.mass);

        // Convert the scalers to vectors by multiplying by the normalised plane vectors.
        var colliderNormalVelocityAfterX = colliderNormalVelocityAfter*collisionNormalVectorX,
            colliderNormalVelocityAfterY = colliderNormalVelocityAfter*collisionNormalVectorY,
            colliderCollisionVelocityAfterX = colliderCollisionVelocity*collisionVectorX,
            colliderCollisionVelocityAfterY = colliderCollisionVelocity*collisionVectorY,
            collideeNormalVelocityAfterX = collideeNormalVelocityAfter*collisionNormalVectorX,
            collideeNormalVelocityAfterY = collideeNormalVelocityAfter*collisionNormalVectorY,
            collideeCollisionVelocityAfterX = collideeCollisionVelocity*collisionVectorX,
            collideeCollisionVelocityAfterY = collideeCollisionVelocity*collisionVectorY;

        // Combine the vectors back into a single vector in world space.
        collider.vx = colliderNormalVelocityAfterX + colliderCollisionVelocityAfterX;
        collider.vy = colliderNormalVelocityAfterY + colliderCollisionVelocityAfterY;
        collidee.vx = collideeNormalVelocityAfterX + collideeCollisionVelocityAfterX;
        collidee.vy = collideeNormalVelocityAfterY + collideeCollisionVelocityAfterY;

        //Step 3: Move entities by their new velocities for the remaining frame time
        collider.x += remainingTime*collider.vx;
        collider.y += remainingTime*collider.vy;
        collidee.x += remainingTime*collidee.vx;
        collidee.y += remainingTime*collidee.vy;
    },

    resolveRectangleRectangle: function(collider, collidee, elapsedTime) {
    },

    resolveCircleRectangle: function(collider, collidee, elapsedTime) {
    }
});

module.exports = CollisionResolver;
