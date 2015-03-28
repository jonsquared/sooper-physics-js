describe('CircleEntity', function() {

    it('exists', function() {
        expect(CircleEntity).toBeDefined();
    });

    it('is an Entity', function() {
        expect(CircleEntity.prototype instanceof Entity).toBe(true);
    });

    it('has a circle bounds', function() {
        expect(CircleEntity.prototype).toEqual(jasmine.objectContaining(CircleBounds.prototype));
    });

    describe('default constructor', function() {
        var e;

        it('does not throw an error', function() {
            expect(function () {
                e = new CircleEntity();
            }).not.toThrow();
        });

        it('has correct default properties', function() {
            expect(e.radius).toBe(0.5);
        });
    });

    describe('constructor', function() {

        it('accepts a configuration of all configurable properties', function() {

            var config = {
                type: Entity.STATIC,
                x: 1,
                y: 2,
                vx: 3,
                vy: 4,
                ax: 5,
                ay: 6,
                restitution: 0.5,
                friction: 0.6,
                radius: 42
            };

            expect(new CircleEntity(config)).toEqual(jasmine.objectContaining(config));
        });
    });
});
