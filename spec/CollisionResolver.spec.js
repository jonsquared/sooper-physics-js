xdescribe('CollisionResolver', function() {
    var resolver, entities, collisions;

    it('exists', function() {
        expect(CollisionResolver).toBeDefined();
    });

    describe('default constructor', function() {
        it('does not throw an error', function() {
            expect(function () {
                resolver = new CollisionResolver();
            }).not.toThrow();
        });
        it('has correct default properties', function() {
            expect(resolver.restitutionMap).toEqual(jasmine.any(Object));
            expect(Object.keys(resolver.restitutionMap).length).toBe(0);
        });
    });

    describe('constructor', function() {
        it('accepts a configuration of the restitutionMap', function() {
            var config = {
                    restitutionMap: {
                        0x1: 0.1,
                        0x2: 0.2,
                        0x3: 0.3,
                        0x4: 0.4,
                        0x5: 0.5,
                        0x6: 0.6
                    }
                }
            resolver = new CollisionResolver(config);
            expect(resolver.restitutionMap).toEqual(jasmine.objectContaining(config.restitutionMap));
        });

        it('accepts a configuration of the getRestitution function', function() {
            var config = {
                    getRestitution: function() {
                        return 42;
                    }
                },
                resolver = new CollisionResolver(config);
            expect(resolver.getRestitution).toBe(config.getRestitution);
        });
    });

    describe('getRestitution', function() {
        it('when given invalid parameters, return 0', function() {
            entities = [
                new CircleEntity(),
                new CircleEntity()
            ]

            expect(resolver.getRestitution()).toBe(0);
            expect(resolver.getRestitution(entities[0],null)).toBe(0);
            expect(resolver.getRestitution(null,entities[1])).toBe(0);
        });

        it('when given entities whose combined collisionCategory is not in the restitutionMap, returns 0', function() {
            entities = [
                new CircleEntity(),
                new CircleEntity({collisionCategory:42})
            ]
            expect(resolver.getRestitution(entities[0],entities[1])).toBe(0);
        });

        it('when given entities whose combined collisionCategory is in the restitutionMap, returns mapped restitution', function() {
            entities = [
                new CircleEntity({collisionCategory:0x1}),
                new CircleEntity({collisionCategory:0x2}),
                new CircleEntity({collisionCategory:0x4})
            ]
            expect(resolver.getRestitution(entities[0],entities[0])).toBe(0.1);
            expect(resolver.getRestitution(entities[1],entities[1])).toBe(0.2);
            expect(resolver.getRestitution(entities[0],entities[1])).toBe(0.3);
            expect(resolver.getRestitution(entities[2],entities[2])).toBe(0.4);
            expect(resolver.getRestitution(entities[0],entities[2])).toBe(0.5);
            expect(resolver.getRestitution(entities[1],entities[2])).toBe(0.6);
        });
    });

    describe('resolve', function() {
        function buildCollisions(entities,collisionIndices) {
            var collisions = new Array(collisionIndices.length);
            for (var i=0; i<collisionIndices.length; i++)
                collisions[i] = entities[collisionIndices[i]];
            return collisions;
        }

        function expectEntityProperties(entity, props) {
            for (var prop in props)
                expect(entity[prop]).toBe(props[prop]);
        }

        it('when given no collisions, does not throw an error', function() {
            expect(function () {
                resolver.resolve([]);
            }).not.toThrow();
        });

        it('when given 2 touching circles with no velocity, no changes occur', function() {
            entities = [
                new CircleEntity({}),
                new CircleEntity({ x: 1 })
            ]
            collisions = buildCollisions(entities,[0,1]);

            resolver.resolve(collisions);

            expectEntityProperties(entities[0], { x: 0, y: 0, vx: 0, vy: 0, ax: 0, ay: 0 });
            expectEntityProperties(entities[1], { x: 1, y: 0, vx: 0, vy: 0, ax: 0, ay: 0 });
        });

        it('when given 2 touching circles with velocity and zero restitution, circles stop moving', function() {
            entities = [
                new CircleEntity({ vx: 1, vy: 1}),
                new CircleEntity({ x: Math.SQRT1_2, y: Math.SQRT1_2, vx: -1, vy: -1 })
            ]
            collisions = buildCollisions(entities,[0,1]);

            resolver.resolve(collisions);

            expectEntityProperties(entities[0], { x: 0, y: 0, vx: 0, vy: 0, ax: 0, ay: 0 });
            expectEntityProperties(entities[1], { x: Math.SQRT1_2, y: Math.SQRT1_2, vx: 0, vy: 0, ax: 0, ay: 0 });
        });

        it('when given 2 touching circles with divergent velocitis and zero restitution, circles continue moving', function() {
            entities = [
                new CircleEntity({ vx: 1, vy: 1}),
                new CircleEntity({ x: 1, vx: -1, vy: -1 })
            ]
            collisions = buildCollisions(entities,[0,1]);

            resolver.resolve(collisions);

            expectEntityProperties(entities[0], { x: 0, y: 0, vx: 1, vy: 1 });
            expectEntityProperties(entities[1], { x: 1, y: 0, vx: -1, vy: -1 });
        });

        // it('when given 2 touching circles with converging velocity vectors and non-zero coefficient of restitution, velocity vectors are diverging correctly', function() {
        //     entities = [
        //         new CircleEntity({ collisionCategory: 0x1, vx: 1, vy: 0}),
        //         new CircleEntity({ collisionCategory: 0x4, x: 1, vx: -1, vy: 0 })
        //     ]
        //     collisions = buildCollisions(entities,[0,1]);

        //     resolver.resolve(collisions);

        //     expectEntityProperties(entities[0], { x: 0, y: 0, vx: -0.5, vy: 0, ax: 0, ay: 0 });
        //     expectEntityProperties(entities[1], { x: 1, y: 0, vx: 0.5, vy: 0, ax: 0, ay: 0 });
        // });

    });
});
