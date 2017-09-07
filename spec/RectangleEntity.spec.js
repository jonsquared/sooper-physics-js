describe('RectangleEntity', function() {

    it('exists', function() {
        expect(RectangleEntity).toBeDefined();
    });

    it('is an Entity', function() {
        expect(RectangleEntity.prototype instanceof Entity).toBe(true);
    });

    it('has a rectangle bounds', function() {
        expect(RectangleEntity.prototype).toEqual(jasmine.objectContaining(RectangleBounds.prototype));
    });

    describe('default constructor', function() {
        var e;

        it('does not throw an error', function() {
            expect(function () {
                e = new RectangleEntity();
            }).not.toThrow();
        });

        it('has correct default properties', function() {
            expect(e).toEqual(jasmine.objectContaining({
                type: Entity.DYNAMIC,
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                ax: 0,
                ay: 0,
                friction: 1,
                width: 1,
                height: 1
            }));
            expect(e.width).toBe(1);
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
                friction: 0.2,
                width: 7,
                height: 8
            };

            expect(new RectangleEntity(config)).toEqual(jasmine.objectContaining(config));
        });
    });
});
