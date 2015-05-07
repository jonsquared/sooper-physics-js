describe('CollisionDetector', function() {
    var detector, entities, collisions;

    it('exists', function() {
        expect(CollisionDetector).toBeDefined();
    });

    describe('default constructor', function() {
        it('does not throw an error', function() {
            expect(function () {
                detector = new CollisionDetector();
            }).not.toThrow();
        });
    });

    describe('detect', function() {
        it('when given no entities, returns empty array', function() {
            collisions = detector.detect([]);
            expect(Array.isArray(collisions)).toBe(true);
            expect(collisions.length).toBe(0);
        });

        it('when given 1 entity, returns empty array', function() {
            collisions = detector.detect([
                new Entity()
            ]);
            expect(collisions.length).toBe(0);
        });

        function expectCollisions(entities, collisions, expectedIndices) {
            expect(collisions.length).toBe(expectedIndices.length);
            for (var i=0; i<expectedIndices.length; i++)
                expect(collisions[i]).toBe(entities[expectedIndices[i]]);
        }

        describe('circle collisions', function() {
            it('when given 2 circles that do not collide, returns empty array', function() {
                entities = [
                    new CircleEntity({}),
                    new CircleEntity({ x: 10 })
                ]

                collisions = detector.detect(entities);

                expectCollisions(entities,collisions,[]);
            });

            it('when given 2 circles that touch, returns 1 collision pair', function() {
                entities = [
                    new CircleEntity({}),
                    new CircleEntity({x:1})
                ]

                collisions = detector.detect(entities);

                expectCollisions(entities,collisions,[0,1]);
            });

            it('when given 2 circles that overlap, returns 1 collision pair', function() {
                entities = [
                    new CircleEntity({}),
                    new CircleEntity({})
                ]

                collisions = detector.detect(entities);

                expectCollisions(entities,collisions,[0,1]);
            });

            it('when given multiple circles with some collisions, returns correct collision pairs', function() {
                entities = [
                    new CircleEntity(),
                    new CircleEntity({x:1}),
                    new CircleEntity({x:3}),
                    new CircleEntity({x:-1}),
                    new CircleEntity({x:-3}),
                    new CircleEntity({y:1}),
                    new CircleEntity({y:3}),
                    new CircleEntity({y:-1}),
                    new CircleEntity({y:-3}),
                ]

                collisions = detector.detect(entities);

                expectCollisions(entities,collisions,[0,1,0,3,0,5,0,7]);
            });
        })

        describe('rectangle collisions', function() {
            it('when given 2 rectangles that do not collide, returns empty array', function() {
                entities = [
                    new RectangleEntity({}),
                    new RectangleEntity({ x: 10 })
                ]

                collisions = detector.detect(entities);

                expectCollisions(entities,collisions,[]);
            });

            it('when given 2 rectangles that touch on an edge, returns 1 collision pair', function() {
                entities = [
                    new RectangleEntity({}),
                    new RectangleEntity({x:1})
                ]

                collisions = detector.detect(entities);

                expectCollisions(entities,collisions,[0,1]);
            });

            it('when given 2 rectangles that touch on a corner, returns 1 collision pair', function() {
                entities = [
                    new RectangleEntity({}),
                    new RectangleEntity({x:1,y:1})
                ]

                collisions = detector.detect(entities);

                expectCollisions(entities,collisions,[0,1]);
            });

            it('when given 2 rectangles that overlap, returns 1 collision pair', function() {
                entities = [
                    new RectangleEntity({}),
                    new RectangleEntity({})
                ]

                collisions = detector.detect(entities);

                expectCollisions(entities,collisions,[0,1]);
            });

            it('when given multiple rectangles with some collisions, returns correct collision pairs', function() {
                entities = [
                    new RectangleEntity(),
                    new RectangleEntity({x:1}),
                    new RectangleEntity({x:3}),
                    new RectangleEntity({x:-1}),
                    new RectangleEntity({x:-3}),
                    new RectangleEntity({y:1}),
                    new RectangleEntity({y:3}),
                    new RectangleEntity({y:-1}),
                    new RectangleEntity({y:-3}),
                ]

                collisions = detector.detect(entities);

                expectCollisions(entities,collisions,[0,1,0,3,0,5,0,7,1,5,1,7,3,5,3,7]);
            });
        });

        describe('circle and rectangle collisions', function() {
            it('when given a circle and a rectangle that do not collide, returns empty array', function() {
                entities = [
                    new CircleEntity({}),
                    new RectangleEntity({ x: 10 })
                ]

                collisions = detector.detect(entities);

                expectCollisions(entities,collisions,[]);
            });

            it('when given a circle and a rectangle that overlap, returns 1 collision pair', function() {
                entities = [
                    new CircleEntity({}),
                    new RectangleEntity({})
                ]

                collisions = detector.detect(entities);

                expectCollisions(entities,collisions,[0,1]);
            });

            it('when given multiple circles that touch a rectangle, returns correct collision pairs', function() {
                entities = [
                    new RectangleEntity({width:3,height:3}),
                    new CircleEntity({x:-2}),
                    new CircleEntity({x:-2,y:-2,radius:Math.SQRT2}),
                    new CircleEntity({y:-2}),
                    new CircleEntity({x:2,y:-2,radius:Math.SQRT2}),
                    new CircleEntity({x:2}),
                    new CircleEntity({x:2,y:2,radius:Math.SQRT2}),
                    new CircleEntity({y:2}),
                    new CircleEntity({x:-2,y:2,radius:Math.SQRT2}),
                ]

                collisions = detector.detect(entities);

                expectCollisions(entities,collisions,[0,1,0,2,0,3,0,4,0,5,0,6,0,7,0,8]);
            });

            it('when given multiple rectangles that touch a circle, returns correct collision pairs', function() {
                entities = [
                    new CircleEntity({radius:2}),
                    new RectangleEntity({x:-2.5}),
                    new RectangleEntity({x:-Math.SQRT2-0.5,y:-Math.SQRT2-0.5}),
                    new RectangleEntity({y:-2.5}),
                    new RectangleEntity({x:Math.SQRT2+0.5,y:-Math.SQRT2-0.5}),
                    new RectangleEntity({x:2.5}),
                    new RectangleEntity({x:Math.SQRT2+0.5,y:Math.SQRT2+0.5}),
                    new RectangleEntity({y:2.5}),
                    new RectangleEntity({x:-Math.SQRT2-0.5,y:Math.SQRT2+0.5})
                ]

                collisions = detector.detect(entities);

                expectCollisions(entities,collisions,[0,1,0,2,0,3,0,4,0,5,0,6,0,7,0,8]);
            });
        });

        describe('filtered collisions', function() {
            it('when given an entity with a 0 category and an overlapping entity, returns no collisions', function() {
                entities = [
                    new CircleEntity({collisionCategory:0x0000}),
                    new CircleEntity()
                ]

                collisions = detector.detect(entities);

                expectCollisions(entities,collisions,[]);
            });

            it('when given an entity with a 0 mask and an overlapping entity, returns no collisions', function() {
                entities = [
                    new CircleEntity({collisionMask:0x0000}),
                    new CircleEntity()
                ]

                collisions = detector.detect(entities);

                expectCollisions(entities,collisions,[]);
            });

            it('when given overlapping entities with mismatched collision category and mask, returns no collisions', function() {
                entities = [
                    new CircleEntity({collisionCategory:0xAAAAAAAA,collisionMask:0x55555555}),
                    new CircleEntity({collisionCategory:0xAAAAAAAA,collisionMask:0x55555555})
                ]

                collisions = detector.detect(entities);

                expectCollisions(entities,collisions,[]);
            });

            it('when given overlapping entities with matched collision category and mask, returns correct collision pairs', function() {
                entities = [
                    new CircleEntity({collisionCategory:0xAAAAAAAA,collisionMask:0x55555555}),
                    new CircleEntity({collisionCategory:0x55555555,collisionMask:0xAAAAAAAA})
                ]

                collisions = detector.detect(entities);

                expectCollisions(entities,collisions,[0,1]);
            });

        });
    });
});
